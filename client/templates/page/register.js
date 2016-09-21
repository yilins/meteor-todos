/**
 * Created by Administrator on 2016/9/8.
 */
Template.register.onRendered(function(){
    var register=$('.register').validate({
        rules: {
            password: {
                minlength: 6
            }
        },
        messages: {
            password: {
                required: "You must enter a password.",
                minlength: "Your password must be at least {0} characters."
            }
        },
        submitHandler: function(){
            var username = $('[name=username]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                username: username,
                password: password
            }, function(error){
                if(error){
                        register.showErrors({'username':error.reason})
                } else {
                    Router.go("home");
                    $('#register').modal('hide')
                }
            });
        }
    });
});
