


export default {
    loadAgenda: (context, courseID) => {
        let fetch = new XMLHttpRequest();
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
        let requstData = {
            courseID : courseID,
        };
        fetch.open("POST", "/api/agenda/load", true);
        fetch.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        fetch.setRequestHeader("Content-Type", "application/json");
        fetch.send(JSON.stringify(requstData));
    },

    updateAgenda: (context, newAgenda) => {
        let fetch = new XMLHttpRequest();
        fetch.onreadystatechange = function(){
            let success = (this.readyState == 4 && this.status == 200);
            context.commit('saveAgendaStatus', success);
        };

        fetch.open("POST", "/api/agenda/save", true);
        fetch.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        fetch.setRequestHeader("Content-Type", "application/json");
        fetch.send(JSON.stringify(newAgenda));
    },

    loadTodolist: () => {

    },

    updateTodo: () => {
        
    },

}