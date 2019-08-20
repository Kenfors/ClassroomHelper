

<template>
<div class="container-fluid">
    <h3 class="display-3">Inlämningar</h3>
    <div class="row" v-if="!Failed && !Loading">
        <button
            v-on:click="getTableData()"
            class="btn btn-outline-info mx-4">
            Uppdatera tabell
        </button>
        <h5>
            <span class="badge" style="background-color: green;">Klar</span>
            <span class="badge" style="background-color: lightgreen;">Orättad</span>
            <span class="badge" style="background-color: yellow;">Tillbakasänd</span>
            <span class="badge" style="background-color: red;">Ej inlämnad</span>
            <span class="badge" style="background-color: purple;">Ej påbörjad</span>
        </h5>
    </div>


    <div v-if="!Loading" class="row">
        
        <div v-if="!Failed" class="col-2">
            <table class="table table-light table-striped table-bordered table-hover">
                <thead >
                    <tr >
                        <th class="text-break text-uppercase" style="min-width:120px; min-height: 200px; max-height: 200px;">
                        Namn
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="row in TableRows"
                    v-bind:key="row.name">
                        <th style="min-width: 200px;height: 50px;" class="text-truncate">{{row.name}}</th>
                    </tr>
                </tbody>
            </table>
        </div>


        <div v-if="!Failed" class="col-10 table-responsive mx-0 px-0">
            <table class="table table-light table-striped table-bordered table-hover">
                <thead>
                    <tr >
                        <th class="text-truncate text-uppercase" style="min-width:60px; max-width:100px; min-height: 200px; max-height: 200px;"
                        v-for="(column, i) in TableHeader"
                        v-bind:key="i">
                        {{column}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                    v-for="row in TableRows"
                    v-bind:key="row.name">
                        
                        <td style="height: 50px;" class="m-0 p-0 text-center hover"
                        v-for="(data, index) in row.submissions"
                        v-bind:key="index"
                        v-bind:style="{'background-color' : data.color}"
                        v-on:click="submissionModal(data.id, data.link)"
                        >
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="Failed" class="alert alert-danger" >
            <h3>Error</h3>
            <p>{{ErrorMessage}}</p>
        </div>
    </div>
    <div v-if="Loading" >
        <div class="progress my-5">
            <div class="progress-bar progress-bar-striped bg-success" role="progressbar" v-bind:style="{'width' : loadProgress + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
</div>
</template>


<script>





export default {
  name: 'app',
  components: {
      
  },
  data: function () {
    return {
        Loading: false,
        Failed : false,
        ErrorMessage : "",
        Course: this.$root.CurrentCourse,
        TableHeader: [],
        TableRows: [],
        TData: {},

        pendingWorks: 0,
        totalWorks: 0,

    }
  },
  computed: {
      loadProgress: function(){
          let result = this.totalWorks - this.pendingWorks;
          result /= this.totalWorks;
          result *= 100;
          return result;
      }
      
  },
  methods: {
      getTableData: function(){

          this.TableHeader = [];
          var courseID = this.$route.params.courseid;
          var vm = this;
          var GClient = this.$root.$GoogleClient;
          this.pendingWorks = -1;

          if(!courseID){
              console.log("No course id.");
              return;
          }

          this.Loading = true;
          this.Failed = false;
          this.totalWorks = 0;

          GClient.client.classroom.courses.students.list({
              courseId : courseID,
          }).then(function(studentQuery){
              GClient.client.classroom.courses.courseWork.list({
                  courseId : courseID,
              }).then(function(workQuery){

                let students = studentQuery.result.students;
                let works = workQuery.result.courseWork;

                vm.TData = {};

                try {
                    for(let i = 0; i < studentQuery.result.students.length; i++){
                        let newStudent = {};
                        newStudent['name'] = students[i].profile.name.fullName;
                        newStudent['id'] = students[i].userId;
                        newStudent['submissions'] = new Array(works.length);
                        vm.TData[students[i].userId] = newStudent;
                    }

                    vm.pendingWorks = works.length;
                    vm.totalWorks = works.length;
                    vm.TableHeader = [];
                    vm.TableRows = [];
                    //vm.TableHeader.push('Namn');
                    for(let i = 0; i < works.length;i++){
                        vm.TableHeader.push(works[i].title);
                        
                        vm.loadSubmissions(i, works[i].id, courseID);

                    }


                } catch (error) {
                    vm.Failed = true;
                    vm.Loading = false;
                    vm.ErrorMessage = error;
                }

                


              }, function(error){
                vm.Failed = true;
                vm.Loading = false;
                vm.ErrorMessage = error;
            });
          }, function(error){
              vm.Failed = true;
              vm.Loading = false;
              vm.ErrorMessage = error;
          });
      },

      loadSubmissions: function(workIndex, wID, cID){
          var vm = this;
          var GClient = this.$root.$GoogleClient;

          GClient.client.classroom.courses.courseWork.studentSubmissions.list({
                courseId : cID,
                courseWorkId : wID,
            }).then(function(submissionQuery){

                try {
                    let subs = submissionQuery.result.studentSubmissions;
                    for(let i = 0; i < subs.length; i++){
                        let tableEntry = {};
                        tableEntry['id'] = subs[i].id;
                        tableEntry['noGrade'] = false;
                        switch (subs[i].state) {
                            case 'CREATED':
                                tableEntry['color'] = 'red';
                                break;
                            case 'NEW':
                                tableEntry['color'] = 'purple';
                                break;
                            case 'RECLAIMED_BY_STUDENT':
                            case 'RETURNED':
                                tableEntry['color'] = 'yellow';
                                break;
                            case 'TURNED_IN':
                                tableEntry['color'] = 'lightgreen';
                                if( subs[i].assignedGrade >= 0 || subs[i].draftGrade >= 0){
                                }
                                else {
                                    tableEntry['noGrade'] = true;
                                }
                                break;
                            default:
                                tableEntry['color'] = 'white';
                        }

                        if( subs[i].assignedGrade >= 0 || subs[i].draftGrade >= 0){
                            tableEntry['noGrade'] = false;
                            tableEntry['color'] = 'darkgreen';
                        }

                        tableEntry['link'] = subs[i].alternateLink;

                        vm.TData[subs[i].userId].submissions[workIndex] = tableEntry;
                    }

                vm.pendingWorks--;


                } catch (error) {
                    vm.Failed = true;
                    vm.Loading = false;
                    vm.ErrorMessage = error;
                }


            }, function(error){
                vm.Failed = true;
                vm.Loading = false;
                vm.ErrorMessage = error;
            });
      },

      finalizeData: function(){
          this.TableRows = [];
            for (var student in this.TData) {
                if (this.TData.hasOwnProperty(student)) {
                    this.TableRows.push(this.TData[student]);
                }
            }
      },
      submissionModal: function(subID, link){
          // eslint-disable-next-line
          console.log("Submission ID: " + subID);

          window.open(link);

      },
  },
  watch: {
      '$route.params.courseid' (to){
          if(this.Loading) return;
          this.getTableData();
      },
      '$route.name' (to){
          if(this.Loading) return;
          if(to == 'submissions')
            this.getTableData();
      },
      pendingWorks (to){
          if(to === 0){
            this.Loading = false;
            // eslint-disable-next-line
            console.log("Load complete...");
            this.finalizeData();
          }
      }
  },
  mounted(){    
      this.getTableData();
      
  },
}

</script>

<style>

.hover:hover{
    opacity: 0.2;
    cursor: pointer;
}

</style>
