(function () {
  var URL = 'https://nejgormbcbbnpxtlkvwu.supabase.co';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lamdvcm1iY2JibnB4dGxrdnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NjEzNzQsImV4cCI6MjA5MzQzNzM3NH0.OUJCUIlmwbiiTvzG3DnfjSIOWfKmq3mq8LdJMutZJOk';

  function insert(table, data, onOk, onErr) {
    fetch(URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: {
        'apikey': KEY,
        'Authorization': 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (r.ok || r.status === 201) { onOk(); } else { onErr(); }
    }).catch(onErr);
  }

  /* ── Simple email signup forms ── */
  document.querySelectorAll('.email-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;
      var email = emailInput.value.trim();
      var source = form.dataset.source || 'website';
      btn.disabled = true;
      btn.textContent = 'Sending...';
      insert('signups', { email: email, source: source },
        function () {
          form.innerHTML = '<p style="color:#fff;font-weight:600;font-size:0.95rem;opacity:0.9;">You\'re in. We\'ll be in touch.</p>';
        },
        function () {
          btn.disabled = false;
          btn.textContent = 'Try again';
        }
      );
    });
  });

  /* ── Partner enquiry form ── */
  (function () {
    var form = null;
    document.querySelectorAll('form.form-stack').forEach(function (f) {
      if (f.querySelector('#partner-name')) form = f;
    });
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      insert('partner_enquiries', {
        name:             form.querySelector('[name="name"]').value,
        company:          form.querySelector('[name="company"]').value,
        role:             form.querySelector('[name="role"]').value,
        email:            form.querySelector('[name="email"]').value,
        partnership_type: form.querySelector('[name="partnership_type"]').value,
        about:            form.querySelector('[name="about"]').value
      },
        function () {
          form.innerHTML = '<p style="font-size:1rem;font-weight:600;padding:2rem 0;">Thanks! We\'ll be in touch within 48 hours.</p>';
        },
        function () {
          btn.disabled = false;
          btn.textContent = 'Send Partnership Enquiry';
        }
      );
    });
  })();

  /* ── Speaker application form ── */
  (function () {
    var form = null;
    document.querySelectorAll('form.form-stack').forEach(function (f) {
      if (f.querySelector('#speak-name')) form = f;
    });
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      insert('speaker_enquiries', {
        name:         form.querySelector('[name="name"]').value,
        email:        form.querySelector('[name="email"]').value,
        topic:        form.querySelector('[name="topic"]').value,
        background:   form.querySelector('[name="background"]').value,
        social:       form.querySelector('[name="social"]').value,
        anything_else: form.querySelector('[name="anything_else"]').value
      },
        function () {
          form.innerHTML = '<p style="font-size:1rem;font-weight:600;padding:2rem 0;">Application received. We review every one personally.</p>';
        },
        function () {
          btn.disabled = false;
          btn.textContent = 'Apply to Speak';
        }
      );
    });
  })();

})();
