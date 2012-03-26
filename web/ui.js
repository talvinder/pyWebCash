apiurl = "api.py";

function loadtransactions() {
  $.ajax({
    type: "POST",
    url: apiurl,
    data: { "action": "gettransactions" },
    success: function(data) {
      $("#transtablebody").html("");
      for (t=0; t<data.length; t++) {
        $("#transtablebody").append("<tr><td>"+data[t]["date"]+"</td><td>"+data[t]["desc"]+"</td><td>"+data[t]["amount"]+"</td></tr>\n");
      }
    },
    error: function() {
      alert("Transaction loading error");
    }
  });
}

$(document).ready(function () {
  $("#login").hide();
  $("#transactions").hide();
  $.ajax({
    type: "POST",
    url: apiurl,
    data: { "action": "checklogin" },
    success: function(data) {
      if (data) {
        $("#transactions").show();
        loadtransactions();
      } else {
        $("#login").show();
      }
    },
    error: function() {
      $("#login").show();
    }
  });
  $("#loginsubmit").click(function () {
    $.ajax({
      type: "POST",
      url: apiurl,
      data: { "action": "login", "username": $("#username").val(), "password": $("#password").val() },
      success: function(data) {
        if (data) {
          $("#login").hide();
          $("#transactions").show();
          loadtransactions();
        } else {
          alert("Login Failed");
        }
      },
      error: function() {
        alert("Login Error");
      }
    });
  });
});
