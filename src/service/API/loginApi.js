export default {
    
    sendEmail:'getEmailCode' ,
    register:'userRegister' ,
    login:'userLogin' ,
    resetPwd:'updatePassword' ,
    resetPwdCheck:'emailVerification',
    messageList:'/messageList',//信息推送 hxl 
    failureAssign: "reportFailure" ,// 故障上报
    addComplaintsSuggestion:'addComplaintsSuggestion',//投诉与建议
    reportFailure: 'getFailureDetail',//故障上报管理
    getAnnouncement:'getAnnouncement' ,//公告头条信息接口
    getAllUser:'getAllUserByRole',//获取委托人
    carBindingList:'/carBindingList',
    vinSearchInfo:'identification-api/v1/query/vehicle/vin' ,//车辆vin码查询
    packageSearch: 'identification-api/v1/query/battery/package', //电池包码信息查询
    batteryStatus:'identification-api/v1/query/battery/status' , //电池状态
    batteryError :'identification-api/v1/query/battery/alarm' , //电池故障
    getAllUser:'getAllUserByRole',//获取委托人
     updateFailure:'updateFailure',//修改错误

     //文件上传
    fileUpload:'cross/fileUpload',

    
       //#region  回收发起，回收评测api 
       recyclingLaunch: 'recyclingLaunch',//回收发起  新增 
       recyclingList:'recyclingList',  //回收管理列表
       recyclingInfo:'recyclingInfo',  //以及回收详情
   
       recyclingEvaluation:'recyclingEvaluationAdd', //回收评测更新
       evaluationInfo:'evaluationInfo', //回收评测查看  已评测的
       recoveryevaluation_list:'recycleEvaluationList',//回收测评列表 列表信息
       //#endregion

    
}