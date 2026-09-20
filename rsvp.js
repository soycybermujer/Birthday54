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

  var form     = document.getElementById("rsvp-form");
  var button   = document.getElementById("submit-btn");
  var errorEl  = document.getElementById("form-error");
  var errorMsg = document.getElementById("form-error-msg");
  var errorWhy = document.getElementById("form-error-detail");
  var panel    = document.getElementById("confirmation");
  var rsvpEl   = document.getElementById("rsvp");

  if (!form || !panel || !window.fetch) return; // keep the native fallback

  var MESSAGES = {
    Yes: {
      icon:  "#i-flutes",
      title: "You're in!",
      body:  "Can't wait to celebrate with you.",
      meta:  "See you October 2"
    },
    No: {
      icon:  "#i-heart",
      title: "Thank you for letting me know",
      body:  "You'll be missed!",
      meta:  ""
    }
  };

  function show(answer) {
    var msg = MESSAGES[answer] || MESSAGES.No;

    document.getElementById("confirmation-icon")
      .querySelector("use").setAttribute("href", msg.icon);
    document.getElementById("confirmation-title").textContent = msg.title;
    document.getElementById("confirmation-body").textContent  = msg.body;

    var meta = document.getElementById("confirmation-meta");
    meta.textContent = msg.meta;
    meta.hidden = !msg.meta;

    rsvpEl.hidden = true;
    panel.hidden = false;
    panel.focus();
  }

  // One warm line for the guest, one plain line naming the actual cause, so a
  // failure can be fixed instead of guessed at.
  function fail(why) {
    errorMsg.textContent =
      "That didn't go through. Please try again \u2014 or just text me and I'll add you.";
    errorWhy.textContent = why;
    errorEl.hidden = false;
    button.disabled = false;
    button.textContent = "Confirm RSVP";
  }

  form.addEventListener("submit", function (event) {
    // Let the browser show its own validation bubbles first.
    if (!form.checkValidity()) return;

    event.preventDefault();

    // Opened straight from disk there is no server to post to, and the native
    // fallback cannot work either. Say so rather than blaming the network.
    if (location.protocol !== "http:" && location.protocol !== "https:") {
      fail("This page has to be published before it can send anything "
         + "(opened as " + location.protocol + ").");
      return;
    }

    errorEl.hidden = true;
    button.disabled = true;
    button.textContent = "Sending\u2026";

    var data = new FormData(form);
    var answer = data.get("rsvp");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    })
      .then(function (response) {
        if (response.ok) { show(answer); return; }
        if (response.status === 404) {
          fail("The host has no form registered here yet (404). "
             + "Turn on form detection, then deploy again.");
        } else {
          fail("The host refused the submission (HTTP " + response.status + ").");
        }
      })
      .catch(function () {
        fail(navigator.onLine === false
          ? "Your device looks offline."
          : "Could not reach the server.");
      });
  });
})();
