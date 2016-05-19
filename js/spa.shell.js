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
            id_card_warning_text:'身份证不合法或不为空'
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
            $user_login:$('.user-login'),
            $user_name:$('.user-name'),
            $user_id_card:$('.user-id-card'),
            $name_warning_info:$('.name-warning-info'),
            $idcard_warning_info:$('.idcard-warning-info'),
            $name:$('.user-name').val(),
            $idcard:$('.user-id-card').val()
        };
    };
    function onInit(){
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
    function onSumitToggle(){
        if(configMap.user_name_info_warning&&configMap.user_idcard_info_warning){
            ////***可以提交，禁止多次提交***////
            //jqueryMap.$user_login.removeAttr("disabled");
            jqueryMap.$user_login.on('click',function(){
                //jqueryMap.$user_login.attr("disabled","disabled");
                return true;
            });
        }else{
            ///**禁止提交**///
            jqueryMap.$user_login.on('click',function(){
                return true;
            });
            //jqueryMap.$user_login.attr("disabled","disabled");
        }
    };
    function onNameWarning_info(){
        if(configMap.user_name_info_warning){
            jqueryMap.$name_warning_info.css({'display':'none'});
        }else{
            console.log(1);
            jqueryMap.$name_warning_info.text(configMap.name_warning_text);
        };
        onSumitToggle();
    };
    function onIdcardWarning_info(){
        if(configMap.user_idcard_info_warning){
            jqueryMap.$idcard_warning_info.css({'display':'none'});
        }else{
            console.log(2);
            jqueryMap.$idcard_warning_info.text(configMap.id_card_warning_text);
        }

        onSumitToggle();

    };
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
        jqueryMap.$user_name.change(onNameValidate);
        jqueryMap.$user_id_card.change(onIdCardValidate);
    };
    return { initModule : initModule };

}());
