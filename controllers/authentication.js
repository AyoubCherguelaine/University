
/**
 * define session type for all user: 
 * 
 *      admin :     {idAdmin,Roll}
 *              System :        Roll="Sys"
 *              University :    Roll="Univ"
 *              Faculty :       Roll="Fac"
 * 
 *  
 * 
 *      Professor : {idProfessor,fname,lname}
 *      
 * 
 *      Student :   {idStudent,fname,lname} 
 */


const GetIp = (req)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
}