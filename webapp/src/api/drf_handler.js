


export default {
    loadAgenda: (context, courseID) => {
        fetch.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                let resp = JSON.parse(this.response);

                let newAgenda = {
                    courseID: courseID,
                    text: resp.text,
                }

                context.commit('setAgenda', newAgenda);
            }
        };

        fetch.open("POST", "/api/agenda/list", true);
        fetch.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        fetch.setRequestHeader("Content-Type", "application/json");
        fetch.send(courseID);
    },

    updateAgenda: (context, newAgenda) => {
        fetch.onreadystatechange = function(){
            let success = (this.readyState == 4 && this.status == 200);
            context.commit('saveAgendaStatus', success);
        };

        fetch.open("POST", "/api/agenda/list", true);
        fetch.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        fetch.setRequestHeader("Content-Type", "application/json");
        fetch.send(newAgenda);
    },

    loadTodolist: () => {

    },

    updateTodo: () => {
        
    },

}