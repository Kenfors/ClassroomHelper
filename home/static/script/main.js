

console.log("### Init");


Vue.component('app-header',{

    template : "<header></header>",
    data : {
        header : 'Header from URL',
    }
})

Vue.component('app-nav',{

    template : "<nav>navnavnavnav</nav>",

})

Vue.component('app-body',{

    template : "<div class='container row'></div>",
})

Vue.component('app-page',{

    template : "<section class='col-10'></section>",
})

Vue.component('app-side',{

    template : "<aside class='col-2'></aside>",
})

app = new Vue({
    el : '#app',
    delimiters: ['[[', ']]'],

})