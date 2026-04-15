let editingId = null;

async function cargarVentas(filtro = '') {
    const tbody = document.getElementById('ventas-tbody');
    tbody.innerHTML = `<tr class="loading-row"><td colspan="5"><span class="spinner"></span> Cargando ventas...</td></tr>`;
    try {
        const ventas = await apiGet('ventas');
        const filtradas = filtro
            ? ventas.filter(v =>
                v.prenda?.toLowerCase().includes(filtro) ||
                v.marca?.toLowerCase().includes(filtro))
            : ventas;

        document.getElementById('total-ventas').textContent = ventas.length;

        if (filtradas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5">
                <div class="empty-state">
                    <div class="empty-icon">🛒</div>
                    <p>No se encontraron ventas</p>
                </div>
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtradas.map(v => `
            <tr>
                <td data-label="Prenda"><strong>${v.prenda || '—'}</strong></td>
                <td data-label="Marca"><span class="badge badge-blue">${v.marca || '—'}</span></td>
                <td data-label="Cantidad"><span class="badge badge-green">${v.cantidad ?? '—'}</span></td>
                <td data-label="ID"><code style="font-size:0.75rem;color:#6b7280">${v._id}</code></td>
                <td data-label="Acciones">
                    <button class="btn-icon btn-edit" onclick="abrirEditar('${v._id}', '${escStr(v.prenda)}', '${escStr(v.marca)}', ${v.cantidad ?? 0})" title="Editar">✎</button>
                    <button class="btn-icon btn-delete" onclick="abrirEliminar('${v._id}', '${escStr(v.prenda)}')" title="Eliminar">✕</button>
                </td>
            </tr>
        `).join('');
    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--danger);padding:2rem;">Error al conectar con la API: ${e.message}</td></tr>`;
    }
}

function escStr(v) { return (v || '').replace(/'/g, "\\'"); }

function abrirAgregar() {
    editingId = null;
    document.getElementById('modal-titulo').textContent = '➕ Nueva Venta';
    document.getElementById('form-venta').reset();
    openModal('modal-venta');
}

function abrirEditar(id, prenda, marca, cantidad) {
    editingId = id;
    document.getElementById('modal-titulo').textContent = '✎ Editar Venta';
    document.getElementById('f-prenda').value = prenda;
    document.getElementById('f-marca').value = marca;
    document.getElementById('f-cantidad').value = cantidad;
    openModal('modal-venta');
}

function abrirEliminar(id, nombre) {
    document.getElementById('confirm-nombre').textContent = nombre;
    document.getElementById('btn-confirmar-eliminar').onclick = () => eliminarVenta(id);
    openModal('modal-confirm');
}

document.getElementById('form-venta').addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        prenda:   document.getElementById('f-prenda').value.trim(),
        marca:    document.getElementById('f-marca').value.trim(),
        cantidad: parseInt(document.getElementById('f-cantidad').value)
    };
    try {
        if (editingId) {
            await apiPut('ventas', editingId, data);
            showToast('Venta actualizada exitosamente');
        } else {
            await apiPost('ventas', data);
            showToast('Venta registrada exitosamente');
        }
        closeModal('modal-venta');
        cargarVentas();
    } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
    }
});

async function eliminarVenta(id) {
    try {
        await apiDelete('ventas', id);
        showToast('Venta eliminada exitosamente');
        closeModal('modal-confirm');
        cargarVentas();
    } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
    }
}

document.getElementById('buscador').addEventListener('input', e => {
    cargarVentas(e.target.value.toLowerCase());
});

cargarVentas();
