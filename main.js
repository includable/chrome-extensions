var ___gmail, ___addButton;

function ___GOFaddButton() {
  if ($("#omni-button").length) {
    return;
  }

  ___gmail.dom
    .toolbar()
    .find("div:nth-child(2)")
    .first()
    .after(
      '<div class="G-Ni J-J5-Ji">' +
        '<div class="T-I J-J5-Ji T-I-ax7" id="omni-button" role="button" tabindex="0" ' +
        'data-tooltip="Add to OmniFocus" aria-label="Add to OmniFocus" style="user-select: none;">' +
        '<div class="asa"><div class="T-I-J3 J-J5-Ji" style="width: 21px; height: 21px;' +
        "background:url(//s3-eu-west-1.amazonaws.com/tsfil/omni-gnIII.svg) no-repeat center; " +
        'background-size: contain;"></div></div></div></div>'
    );

  $("#omni-button").click(function() {
    var c = ___gmail.get.displayed_email_data();

    var s = "Reply to email: ";
    s += c.subject;

    var n = "";
    n += "People involved: ";
    var xx = [];
    for (var i in c.people_involved) {
      var pp = c.people_involved[i];
      xx.push(pp[0]);
    }
    n += xx.join(", ");
    n += "\n\n";
    n += "https://mail.google.com/mail/u/0/#inbox/" + c.thread_id;

    var url =
      "omnifocus:///add?name=" +
      encodeURIComponent(s) +
      "&amp;note=" +
      encodeURIComponent(n);
    document.body.insertAdjacentHTML(
      "afterEnd",
      '<iframe src="' + url + '" style="display:none" />'
    );
  });
}

function ___GOFmain() {
  if (!("Gmail" in window)) {
    setTimeout(___GOFmain, 10);
    return;
  }

  ___gmail = new Gmail();
  if (___gmail.get.current_page() === "email") {
    ___GOFaddButton();
  }
  ___gmail.observe.on("view_thread", function() {
    setTimeout(function() {
      ___GOFaddButton();
    }, 5);
  });
}

___GOFmain();
