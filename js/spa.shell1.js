/**
 * Created by Administrator on 2016/5/20.
 */
spa.shell = (function () {
    ////需要的参数
    var
        configMap = {
            login_disabled:false,
            user_idcard_info_warning:false,
            wrong_info_put:true,
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
            $user_id_card:$('.user-id-card'),
            $name_warning_info:$('.name-warning-info'),
            $idcard_warning_info:$('.idcard-warning-info'),
            $phone_warning_info:$('.phone-warning-info'),
            $phone:$('.user-phone').val(),
            $idcard:$('.user-id-card').val(),
            $user_sure:$('.user-sure'),
            $user_code:$('.user-code'),
            $time_clock:$('.time-clock')
        };
    };
    ///**初始化页面数据 输入框信息待清空***////
    function onInit(){
        if(!configMap.user_phone_have){
            jqueryMap.$user_getcode.attr("disabled","disabled");
        };
        if(jqueryMap.$idcard==""){
            jqueryMap.$user_login.css({'display':'none'});
            jqueryMap.$user_sure.css({'display':'none'});
            return configMap.user_idcard_info_warning=false;
        };
        if(configMap.user_idcard_info_warning){
            return configMap.login_disabled=false;
        };
    };
    ////****第二个button的提交****///////
    function onSumitToggle(){
        jqueryMap.$user_login.attr("disabled","disabled");
    };
    ////****禁止重复提交，待改进/////
    ///////**获取验证码并操作第一个表格提交***////////
    function onGettestcode(){
        jqueryMap.$user_getcode.attr("disabled","disabled");
        timeId = setInterval(function(){
            countDown(configMap.wait_time--,configMap.wait_speed);
        },configMap.wait_speed);
        function countDown(seconds,speed){
            if(seconds == 0){
                clearTimeout(timeId);
                jqueryMap.$user_getcode.removeAttr("disabled");
                jqueryMap.$user_testcode.val("输入验证码");
            };
            var txt = "00 : " + ((seconds < 10) ? "0" + seconds : seconds);
            jqueryMap.$time_clock.text(txt);
            jqueryMap.$user_getcode.text(configMap.get_testcode_text);
            jqueryMap.$user_testcode.focus();
        };

    };
    //function onGainGetcode(){
    //    if(jqueryMap.$user_getcode.text()==configMap.get_testcode_text){
    //        jqueryMap.$user_testcode.val("");
    //        //clearTimeout(timeId);
    //        //configMap.wait_time="59";
    //        //jqueryMap.$user_getcode.removeAttr("disabled");
    //    }
    //};
    function onSurecode(){
        jqueryMap.$user_sure.attr("disabled","disabled");
    };
    /////提示信息//////
    function onIdcardWarning_info(){
        if(configMap.user_idcard_info_warning){
            jqueryMap.$idcard_warning_info.css({'display':'none'});
        }else{
            jqueryMap.$idcard_warning_info.text(configMap.id_card_warning_text);
        }
    };
    function onPhoneValidate(){
        var val=jqueryMap.$user_phone.val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(reg.test(val)){
            jqueryMap.$user_getcode.removeAttr("disabled");
            jqueryMap.$phone_warning_info.css({'display':'none'});

        }
        if(!reg.test(val)){
            jqueryMap.$user_getcode.attr("disabled","disabled");
            jqueryMap.$phone_warning_info.css({'display':''});
        }

    };
    //////输入信息验证///////
    function onIdCardValidate(){
        var val=jqueryMap.$user_id_card.val();
        var reg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if(reg.test(val)){
            configMap.user_idcard_info_warning=true;
            jqueryMap.$user_login.css({'display':''});
        }
        if(!reg.test(val)){
            configMap.user_idcard_info_warning=false;
            jqueryMap.$user_login.css({'display':'none'});
        }
        onIdcardWarning_info();
    };
    function onCodeValidate(){
        var val=jqueryMap.$user_testcode.val();
        var reg=/\d{6}/;
        if(reg.test(val)){
            jqueryMap.$user_sure.css({'display':''});
        }
        if(!reg.test(val)){
            jqueryMap.$user_sure.css({'display':'none'});
        }
    };
    ///初始化模块跟绑事件
    initModule = function ( $container ) {
        stateMap.$container = $container;
        setJqueryMap();
        onInit();
        jqueryMap.$user_phone.on('input propertychange',onPhoneValidate);
        jqueryMap.$user_id_card.on('input propertychange',onIdCardValidate);
        $("form:first").submit(onSumitToggle);
        $("form:eq(1)").submit(onGettestcode);
        jqueryMap.$user_testcode.on('input propertychange',onCodeValidate);
        $("form:last").submit(onSurecode);
        //jqueryMap.$user_testcode.focus(onGainGetcode);
        //jqueryMap.$user_testcode.blur(onGainGetcode);
    };
    return { initModule : initModule };

}());
