/**
 * Created by Administrator on 2016-05-19.
 */
spa.shell = (function () {
   ////需要的参数
    var
        configMap = {
            login_disabled:false,
            user_name_info_warning:false,
            user_idcard_info_warning:false,
            wrong_info_put:true,
            name_warning_text:'姓名不合法或不为空',
            id_card_warning_text:'身份证不合法或不为空',
            user_phone_have:false,
            again_submit:true,
            get_testcode_text:'重新获取',
            wait_time:"59",
            wait_speed:"1000"
        },
    ////   模块的动态信息
        stateMap  = {
            $container        : null

        },
        //**变量**//
        jqueryMap = {},

        setJqueryMap, initModule;
    ////模块用的变量
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $user_phone:$('.user-phone'),
            $user_testcode:$('.user-testcode'),
            $user_getcode:$('.get-testcode'),
            $user_login:$('.user-login'),
            $user_name:$('.user-name'),
            $user_id_card:$('.user-id-card'),
            $name_warning_info:$('.name-warning-info'),
            $idcard_warning_info:$('.idcard-warning-info'),
            $name:$('.user-name').val(),
            $phone:$('.user-phone').val(),
            $idcard:$('.user-id-card').val(),
            $user_code:$('.user-code')
        };
    };
    ///**初始化页面数据 输入框信息待清空***////
    function onInit(){
        if(!configMap.user_phone_have){
            jqueryMap.$user_getcode.attr("disabled","disabled");
        };
        if(jqueryMap.$name==""){
            return configMap.user_name_info_warning=false;
        };
        if(jqueryMap.$idcard==""){
            return configMap.user_idcard_info_warning=false;
        };
        if(configMap.user_name_info_warning||configMap.user_idcard_info_warning){
            return configMap.login_disabled=false;
        }
    };
    ////****第二个button的提交****///////
    function onSumitToggle(){
        //jqueryMap.$user_login.attr("disabled","disabled");
        if(configMap.user_name_info_warning&&configMap.user_idcard_info_warning&&configMap.again_submit){
            ////***可以提交，禁止多次提交***////
            console.log(3);
            console.log(configMap.again_submit);
            //jqueryMap.$user_login.removeAttr("disabled");
            configMap.again_submit=false;
            return true;

        }else if(configMap.user_name_info_warning&&configMap.user_idcard_info_warning&&!configMap.again_submit){
            console.log(10);
            onDisable();
        }else{
            ///**禁止提交**///
                return false;
            //jqueryMap.$user_login.attr("disabled","disabled");
        }

    };
    ////****禁止重复提交，待改进/////
    function onDisable(){
        jqueryMap.$user_login.submit(function(){
            jqueryMap.$user_login.attr("disabled","disabled");
        });
        //if(configMap.user_name_info_warning&&configMap.user_idcard_info_warning&&!configMap.again_submit){
        //
        //}
        //alert('禁止重复提交');
    };
    ///////**获取验证码并操作第一个表格提交***////////
    function onGettestcode(){
        jqueryMap.$user_getcode.attr("disabled","disabled");
        var timeId = setInterval(function(){
            countDown(configMap.wait_time--,configMap.wait_speed);
        },configMap.wait_speed);
        function countDown(seconds,speed){
            var txt = "00 : " + ((seconds < 10) ? "0" + seconds : seconds);
            jqueryMap.$user_testcode.val(txt);
            jqueryMap.$user_getcode.text(configMap.get_testcode_text);
            if(seconds == 0){
                clearTimeout(timeId);
                jqueryMap.$user_getcode.removeAttr("disabled");
            };
        }
        //countDown(configMap.wait_time,configMap.wait_speed);
    };
    /////提示信息//////
    function onNameWarning_info(){
        if(configMap.user_name_info_warning){
            jqueryMap.$name_warning_info.css({'display':'none'});
        }else{
            jqueryMap.$name_warning_info.text(configMap.name_warning_text);
        };
    };
    function onIdcardWarning_info(){
        if(configMap.user_idcard_info_warning){
            jqueryMap.$idcard_warning_info.css({'display':'none'});
        }else{
            jqueryMap.$idcard_warning_info.text(configMap.id_card_warning_text);
        }
    };
    function onPhoneValidate(){
        configMap.wait_time=59;

        var val=jqueryMap.$user_phone.val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(reg.test(val)){
            jqueryMap.$user_getcode.removeAttr("disabled");

        }
        if(!reg.test(val)){
            jqueryMap.$user_getcode.attr("disabled","disabled");
        }
    };
    //////输入信息验证///////
    function onNameValidate(){
        var val=jqueryMap.$user_name.val();
        var reg = /^[\u4E00-\u9FA5]{2,4}$/;
        if(reg.test(val)){
            configMap.user_name_info_warning=true;
        }
        if(!reg.test(val)){
            configMap.user_name_info_warning=false;
        }
        onNameWarning_info();
    };
    function onIdCardValidate(){
        var val=jqueryMap.$user_id_card.val();
        var reg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(reg.test(val)){
            configMap.user_idcard_info_warning=true;
        }
        if(!reg.test(val)){
            configMap.user_idcard_info_warning=false;
        }
        onIdcardWarning_info();
    };
    ///初始化模块跟绑事件
    initModule = function ( $container ) {
        stateMap.$container = $container;
        setJqueryMap();
        onInit();
        onSumitToggle();
        jqueryMap.$user_phone.on('input propertychange',onPhoneValidate);
        jqueryMap.$user_name.on('input propertychange',onNameValidate);
        jqueryMap.$user_id_card.on('input propertychange',onIdCardValidate);
        jqueryMap.$user_login.on('click',onSumitToggle);
        $("form:first").submit(onGettestcode);
        //jqueryMap.$user_getcode.on('click',onGettestcode);

    };
    return { initModule : initModule };

}());
