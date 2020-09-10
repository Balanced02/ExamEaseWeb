$("form").on("submit", (e) => {
  e.preventDefault();

  const name = $("#name").val().trim();
  const mail = $("#email").val().trim();
  const subject = $("#subject").val().trim();
  const text = $("#message").val().trim();

  const mailData = {
    name,
    mail,
    subject,
    text,
  };

  $.post("/contact", mailData, function () {
    console.log("Server sent contact details");
  });
});
