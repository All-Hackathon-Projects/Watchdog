$(document).ready(function() {
  var datas = $.get("https://api.github.com/users/iwenyou", function(infos) {
    $.ajax({
      type: "POST",
      url: "https://www.videoindexer.ai/api/widget/breakdowns/b34984f2b2/?accessToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFeHRlcm5hbFVzZXJJZCI6IjEwMTM3MzUyMDQ1MzYyNzQ3ODYwNSIsIlVzZXJUeXBlIjoiR29vZ2xlIiwiQnJlYWtkb3duSWQiOiJiMzQ5ODRmMmIyIiwiQWxsb3dFZGl0IjoiVHJ1ZSIsImlzcyI6Imh0dHBzOi8vd3d3LnZpZGVvaW5kZXhlci5haSIsImF1ZCI6Imh0dHBzOi8vd3d3LnZpZGVvaW5kZXhlci5haSIsImV4cCI6MTUwNjIzNjcxMywibmJmIjoxNTA2MjMyODEzfQ.rYAha5HYMZ19iM5cA91jYtRgRFVhI77DqWGgxWjRdC0",
      data: infos,
      dataType: "json",
      success: function(data) {
        $(".container").append('<div>' + data.form.avatar_url + '</div><div>' + data.form.login + '</div><div>' + data.form.name + '</div>');
      }
    });
  });
});