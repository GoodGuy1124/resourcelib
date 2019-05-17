import Vue from 'Vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
export class Ajax{
    //static msgs = new Map();
    //static id = 1;
    static post=function(method,data)
    {
        return Vue.axios.post(
'http://172.16.2.55:8081/www/test.xxx?m='+method,
            JSON.stringify(data),
           {headers: {'Content-Type': 'application/json;charset=UTF-8'}} 
            );
    //     return Vue.axios.post(
    //  'http://172.16.2.55/www/i.ashx?m='+method,
    //         JSON.stringify(data));
            
    }
// 'www/i.ashx?m='+method,
// 'http://172.16.2.55/www/i.ashx?m='+method,
// "http://47.94.105.93:8080 /www/test.xxx?m="+method,
// 'http://172.18.103.33:9000/www/i.ashx?m='+method,
 //'http://172.16.2.55/DocManager/www/i.ashx?m='+method,
//'../DocManager/www/i.ashx?m='+method,


    /*
    static post=function(method,data,objProc,remData=null)
    {
        //console.log(Ajax.id);
        //Ajax.msgs.set(Ajax.id++,{o:objProc,d:remData}); //记住回调相关信息
        Vue.axios.post(
            'http://localhost:2205/DocManager/www/i.ashx?m='+method,
            JSON.stringify(data)).then(
                (res)=>{
                    //console.log(res.data)
                    if(remData==null) objProc['_'+method](res.data);
                    else objProc['_'+method](res.data,remData);
                }                    
            );
    }
    */
}
