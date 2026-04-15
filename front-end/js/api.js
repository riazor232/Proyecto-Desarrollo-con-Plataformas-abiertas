const API_BASE = 'http://127.0.0.1:5000/tienda/api/v1';

async function apiGet(endpoint, id = null) {
    const url = id ? `${API_BASE}/${endpoint}?id=${id}` : `${API_BASE}/${endpoint}`;
    const resp = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    return resp.json();
}

async function apiPost(endpoint, data) {
    const resp = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!resp.ok) throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    return resp.json();
}

async function apiPut(endpoint, id, data) {
    const resp = await fetch(`${API_BASE}/${endpoint}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!resp.ok) throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    return resp.json();
}

async function apiDelete(endpoint, id) {
    const resp = await fetch(`${API_BASE}/${endpoint}?id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    return resp.json();
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const icon = type === 'success' ? '✓' : '✕';
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function openModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
    }
});

document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
    }
});
