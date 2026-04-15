let editingId = null;

async function cargarMarcas(filtro = '') {
    const tbody = document.getElementById('marcas-tbody');
    tbody.innerHTML = `<tr class="loading-row"><td colspan="4"><span class="spinner"></span> Cargando marcas...</td></tr>`;
    try {
        const marcas = await apiGet('marcas');
        const filtradas = filtro
            ? marcas.filter(m =>
                m.nombre?.toLowerCase().includes(filtro) ||
                m.pais?.toLowerCase().includes(filtro))
            : marcas;

        document.getElementById('total-marcas').textContent = marcas.length;

        if (filtradas.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">
                <div class="empty-state">
                    <div class="empty-icon">🏷️</div>
                    <p>No se encontraron marcas</p>
                </div>
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtradas.map(m => `
            <tr>
                <td data-label="Nombre"><strong>${m.nombre || '—'}</strong></td>
                <td data-label="País"><span class="badge badge-orange">${m.pais || '—'}</span></td>
                <td data-label="ID"><code style="font-size:0.75rem;color:#6b7280">${m._id}</code></td>
                <td data-label="Acciones">
                    <button class="btn-icon btn-edit" onclick="abrirEditar('${m._id}', '${escStr(m.nombre)}', '${escStr(m.pais)}')" title="Editar">✎</button>
                    <button class="btn-icon btn-delete" onclick="abrirEliminar('${m._id}', '${escStr(m.nombre)}')" title="Eliminar">✕</button>
                </td>
            </tr>
        `).join('');
    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--danger);padding:2rem;">Error al conectar con la API: ${e.message}</td></tr>`;
    }
}

function escStr(v) { return (v || '').replace(/'/g, "\\'"); }

function abrirAgregar() {
    editingId = null;
    document.getElementById('modal-titulo').textContent = '➕ Nueva Marca';
    document.getElementById('form-marca').reset();
    openModal('modal-marca');
}

function abrirEditar(id, nombre, pais) {
    editingId = id;
    document.getElementById('modal-titulo').textContent = '✎ Editar Marca';
    document.getElementById('f-nombre').value = nombre;
    document.getElementById('f-pais').value = pais;
    openModal('modal-marca');
}

function abrirEliminar(id, nombre) {
    document.getElementById('confirm-nombre').textContent = nombre;
    document.getElementById('btn-confirmar-eliminar').onclick = () => eliminarMarca(id);
    openModal('modal-confirm');
}

document.getElementById('form-marca').addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('f-nombre').value.trim(),
        pais:   document.getElementById('f-pais').value.trim()
    };
    try {
        if (editingId) {
            await apiPut('marcas', editingId, data);
            showToast('Marca actualizada exitosamente');
        } else {
            await apiPost('marcas', data);
            showToast('Marca agregada exitosamente');
        }
        closeModal('modal-marca');
        cargarMarcas();
    } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
    }
});

async function eliminarMarca(id) {
    try {
        await apiDelete('marcas', id);
        showToast('Marca eliminada exitosamente');
        closeModal('modal-confirm');
        cargarMarcas();
    } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
    }
}

document.getElementById('buscador').addEventListener('input', e => {
    cargarMarcas(e.target.value.toLowerCase());
});

cargarMarcas();
