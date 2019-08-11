

<template>
<div class="container-fluid">
    <h3 class="display-3">Kursöversikt</h3>
    <div v-if="!Loading">
        <div v-if="!Failed" class="container-fluid table-responsive">
            <table class="table table-light table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th class="text-break text-uppercase" style="min-width:120px;"
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
                        <th>{{row.name}}</th>
                        <td 
                        v-for="(data, index) in row.submissions"
                        v-bind:key="index"
                        v-bind:style="{'background-color' : data.color}"
                        v-on:click="submissionModal(data.id)"
                        >
                        <p class="lead" v-if="data.noGrade">!</p>
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
    <div v-if="Loading">
        <div class="progress">
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
  props: function(){
      return{

      }
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
          if(!this.$root.CurrentCourse){
              return;
          }
          this.TableHeader = [];
          var courseID = this.$root.CurrentCourse.id;
          var vm = this;
          var GClient = this.$root.$GoogleClient;
          this.Loading = true;
          this.totalWorks = 0;

          GClient.client.classroom.courses.students.list({
              courseId : courseID,
          }).then(function(studentQuery){
              GClient.client.classroom.courses.courseWork.list({
                  courseId : courseID,
              }).then(function(workQuery){
                let students = studentQuery.result.students;
                let works = workQuery.result.courseWork;

                for(let i = 0; i < studentQuery.result.students.length; i++){
                    let newStudent = {};
                    newStudent['name'] = students[i].profile.name.fullName;
                    newStudent['id'] = students[i].userId;
                    newStudent['submissions'] = new Array(works.length);
                    vm.TData[students[i].userId] = newStudent;
                }

                vm.pendingWorks = works.length;
                vm.totalWorks = works.length;
                vm.TableHeader.push('Namn');
                for(let i = 0; i < works.length;i++){
                    vm.TableHeader.push(works[i].title);
                    
                    vm.loadSubmissions(i, works[i].id, courseID);

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
                            tableEntry['color'] = 'green';
                            if(!subs[i].assignedGrade && !subs[i].draftGrade ){
                                tableEntry['noGrade'] = true;
                            }
                            break;
                        default:
                            tableEntry['color'] = 'white';
                    }

                    tableEntry['link'] = subs[i].alternateLink;

                    vm.TData[subs[i].userId].submissions[workIndex] = tableEntry;
                }

                vm.pendingWorks--;

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
      submissionModal: function(subID){
          // eslint-disable-next-line
          console.log("Submission ID: " + subID);

      },

  },
  watch: {
      $route (to){
          if(to.path == "/submissions"){
              this.getTableData();
          }
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
      
      
  },
}

</script>

<style>


</style>
