let editingId = null;

async function cargarPrendas(filtro = '') {
    const tbody = document.getElementById('prendas-tbody');
    tbody.innerHTML = `<tr class="loading-row"><td colspan="6"><span class="spinner"></span> Cargando prendas...</td></tr>`;
    try {
        const prendas = await apiGet('prendas');
        const filtradas = filtro
            ? prendas.filter(p =>
                p.nombre?.toLowerCase().includes(filtro) ||
                p.marca?.toLowerCase().includes(filtro) ||
                p.color?.toLowerCase().includes(filtro))
            : prendas;

        document.getElementById('total-prendas').textContent = prendas.length;

        if (filtradas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6">
                <div class="empty-state">
                    <div class="empty-icon">👕</div>
                    <p>No se encontraron prendas</p>
                </div>
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtradas.map(p => `
            <tr>
                <td data-label="Nombre"><strong>${p.nombre || '—'}</strong></td>
                <td data-label="Marca"><span class="badge badge-blue">${p.marca || '—'}</span></td>
                <td data-label="Precio"><span class="badge badge-green">₡${Number(p.precio || 0).toLocaleString()}</span></td>
                <td data-label="Talla"><span class="badge badge-gray">${p.talla || '—'}</span></td>
                <td data-label="Color">${p.color || '—'}</td>
                <td data-label="Acciones">
                    <button class="btn-icon btn-edit" onclick="abrirEditar('${p._id}', '${escStr(p.nombre)}', '${escStr(p.marca)}', ${p.precio || 0}, '${escStr(p.talla)}', '${escStr(p.color)}')" title="Editar">✎</button>
                    <button class="btn-icon btn-delete" onclick="abrirEliminar('${p._id}', '${escStr(p.nombre)}')" title="Eliminar">✕</button>
                </td>
            </tr>
        `).join('');
    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--danger);padding:2rem;">Error al conectar con la API: ${e.message}</td></tr>`;
    }
}

function escStr(v) { return (v || '').replace(/'/g, "\\'"); }

function abrirAgregar() {
    editingId = null;
    document.getElementById('modal-titulo').textContent = '➕ Nueva Prenda';
    document.getElementById('form-prenda').reset();
    openModal('modal-prenda');
}

function abrirEditar(id, nombre, marca, precio, talla, color) {
    editingId = id;
    document.getElementById('modal-titulo').textContent = '✎ Editar Prenda';
    document.getElementById('f-nombre').value = nombre;
    document.getElementById('f-marca').value = marca;
    document.getElementById('f-precio').value = precio;
    document.getElementById('f-talla').value = talla;
    document.getElementById('f-color').value = color;
    openModal('modal-prenda');
}

function abrirEliminar(id, nombre) {
    document.getElementById('confirm-nombre').textContent = nombre;
    document.getElementById('btn-confirmar-eliminar').onclick = () => eliminarPrenda(id);
    openModal('modal-confirm');
}

document.getElementById('form-prenda').addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('f-nombre').value.trim(),
        marca:  document.getElementById('f-marca').value.trim(),
        precio: parseFloat(document.getElementById('f-precio').value),
        talla:  document.getElementById('f-talla').value.trim(),
        color:  document.getElementById('f-color').value.trim()
    };
    try {
        if (editingId) {
            await apiPut('prendas', editingId, data);
            showToast('Prenda actualizada exitosamente');
        } else {
            await apiPost('prendas', data);
            showToast('Prenda agregada exitosamente');
        }
        closeModal('modal-prenda');
        cargarPrendas();
    } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
    }
});

async function eliminarPrenda(id) {
    try {
        await apiDelete('prendas', id);
        showToast('Prenda eliminada exitosamente');
        closeModal('modal-confirm');
        cargarPrendas();
    } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
    }
}

document.getElementById('buscador').addEventListener('input', e => {
    cargarPrendas(e.target.value.toLowerCase());
});

cargarPrendas();
