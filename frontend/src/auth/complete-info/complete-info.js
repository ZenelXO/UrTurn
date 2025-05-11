document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.btn-next')?.addEventListener('click', async () => {
    const profile = {
      firstName: document.getElementById('first')?.value || '',
      lastName: document.getElementById('last')?.value || '',
      phone: document.querySelector('.phone-group input')?.value || '',
      dob: document.getElementById('dob')?.value || '',
      country: document.getElementById('countryName')?.value || '',
      state: document.getElementById('state')?.value || '',
      city: document.getElementById('city')?.value || '',
      zip: document.getElementById('zip')?.value || '',
    };

    const token = localStorage.getItem('token');
    console.log('[Complete Info] Token:', token);
    console.log('[Complete Info] Profile data:', profile);

    try {
      const res = await fetch('http://localhost:3000/api/register-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      console.log('[Complete Info] Response status:', res.status);

      if (res.ok) {
        const data = await res.json();
        console.log('[Complete Info] Success response:', data);
        window.location.href = '../../../../index.html';
      } else {
        const data = await res.json();
        console.error('[Complete Info] Error response:', data);
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('[Complete Info] Network error:', err);
    }
  });
});
