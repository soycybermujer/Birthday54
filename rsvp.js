/* Erika's 54th Birthday - RSVP
 *
 * Submits the form to Netlify Forms via fetch so we can show our own
 * confirmation instead of Netlify's default page.
 *
 * If JavaScript is unavailable or this script fails to load, the form
 * falls back to a normal POST and Netlify redirects to /thank-you.html.
 */
(function () {
  "use strict";

  var form    = document.getElementById("rsvp-form");
  var button  = document.getElementById("submit-btn");
  var errorEl = document.getElementById("form-error");
  var panel   = document.getElementById("confirmation");
  var rsvpEl  = document.getElementById("rsvp");

  if (!form || !panel || !window.fetch) return; // keep the native fallback

  var MESSAGES = {
    Yes: {
      icon:  "🥂",                 // clinking glasses
      title: "You're in!",
      body:  "Can't wait to celebrate with you.",
      meta:  "See you October 2"
    },
    No: {
      icon:  "🤍",                 // white heart
      title: "Thank you for letting me know",
      body:  "You'll be missed!",
      meta:  ""
    }
  };

  function show(answer) {
    var msg = MESSAGES[answer] || MESSAGES.No;

    document.getElementById("confirmation-icon").textContent  = msg.icon;
    document.getElementById("confirmation-title").textContent = msg.title;
    document.getElementById("confirmation-body").textContent  = msg.body;

    var meta = document.getElementById("confirmation-meta");
    meta.textContent = msg.meta;
    meta.hidden = !msg.meta;

    rsvpEl.hidden = true;
    panel.hidden = false;

    // The confirmation carries its own closing line, so the standing
    // page footer would only repeat it.
    var footer = document.querySelector(".footer");
    if (footer) footer.hidden = true;

    panel.focus();
  }

  form.addEventListener("submit", function (event) {
    // Let the browser show its own validation bubbles first.
    if (!form.checkValidity()) return;

    event.preventDefault();

    errorEl.hidden = true;
    button.disabled = true;
    button.textContent = "Sending…";

    var data = new FormData(form);
    var answer = data.get("rsvp");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        show(answer);
      })
      .catch(function () {
        errorEl.textContent =
          "Something went wrong sending your RSVP. Please try again, or just text me.";
        errorEl.hidden = false;
        button.disabled = false;
        button.textContent = "Confirm RSVP";
      });
  });
})();
