import {Ajax} from './Ajax'
// import {RSAKeyPair,encryptedString} from './RSA'
// import {setMaxDigits} from './RSA/BigInt'
// import { hex_md5 as md5} from './md5/md5'
var send=function(method,data,obj_cb)
{
    //console.log("AAAAAAAAAAA");
    Ajax.post(method,data).then((r)=>
    {
        // console.log("---------------------------------------------------");
        console.log(r);
        // console.log(method+'_cb');
        // console.log(obj_cb[method+'_cb']);
        if(r.data.Status) {
            // console.log(r.data.Status);
            if(obj_cb[method+'_err']) obj_cb[method+'_err'](obj_cb.$store.state,obj_cb.$store.commit,r.data);
        }
        else{ 
            //   console.log(method);
            //   console.log(r.data);
              obj_cb[method+'_cb'](obj_cb.$store.state,obj_cb.$store.commit,r.data);
            }
    });
}

// var RSA_encrypt=function(RsaXMLPublicKey,str)
// {
//     setMaxDigits(131);
//     let pair = RsaXMLPublicKey.split(",");
//     let key = new RSAKeyPair(pair[0], "", pair[1]);
//     return encryptedString(key, str);
// }

export default
{
    // md5,
    send,
    // RSA_encrypt,
    // arrayToJson
}