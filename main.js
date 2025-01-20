$(document).ready(function () {
    const API_URL_USER1 = 'https://serverexpress-beryl.vercel.app/api/users/user1/';
    const API_URL_ALL_USERS = 'https://serverexpress-beryl.vercel.app/api/users';
    const API_URL_USER = 'https://serverexpress-beryl.vercel.app/api/users';

    // Función para añadir tarjetas
    function addCard(user, id = '') {
        const cardHTML = `
            <div class="carta" id="${id}">
                <h3>${user.nombre} ${user.apellido}</h3>
                <p>Teléfono: ${user.telefono}</p>
            </div>
        `;
        $('.contenedorUsuarios').append(cardHTML);
    }

    // Evento al hacer clic en "Filtrar Uno"
    $("#filtrarUno").on("click", function () {
        $(".contenedorUsuarios .carta").remove();
        $.ajax({
            url: API_URL_USER1,
            method: 'GET',
            success: function (user) {
                console.log('Usuario recibido:', user);
                addCard(user, "user1");
            },
            error: function (error) {
                console.error('Error al obtener el usuario:', error);
                alert('No se pudo obtener el usuario.');
            }
        });
    });

    // Evento al hacer clic en "Filtrar Todos"
    $('#filtrarTodos').on('click', function () {
        $('.contenedorUsuarios .carta').remove();
        $.ajax({
            url: API_URL_ALL_USERS,
            method: 'GET',
            success: function (users) {
                console.log('Usuarios recibidos:', users);
                users.forEach(user => addCard(user, `user${user.id}`));
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
                alert('No se pudieron obtener los usuarios.');
            }
        });
    });

    // Evento al hacer clic en "Filtrar por ID"
    $('#filtrar').on('click', function () {
        const userId = $('#filtro input').val().trim();
        if (userId) {
            $('.contenedorUsuarios .carta').remove();
            $.ajax({
                url: API_URL_USER +"/" + userId,
                method: 'GET',
                success: function (user) {
                    addCard(user);
                },
                error: function () {
                    alert('No se encontró el usuario con esa ID.');
                }
            });
        } else {
            alert('Por favor, ingresa una ID.');
        }
    });

    // Mostrar el formulario
    $('#mostrar').on('click', function () {
        $('#formulario').toggle(); // Alternar entre mostrar y ocultar
    });

    // Evento para añadir usuario
    $('#añadirUsuario').on('click', function (e) {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        const nuevoUsuario = {
            nombre: $('#nombre').val().trim(),
            apellido: $('#apellido').val().trim(),
            telefono: $('#telefono').val().trim(),
        };
        if (nuevoUsuario.nombre && nuevoUsuario.apellido && nuevoUsuario.telefono) {
            $.ajax({
                url: API_URL_ALL_USERS,
                method: 'POST',
                data: JSON.stringify(nuevoUsuario),
                contentType: 'application/json',
                success: function (user) {
                    alert('Usuario añadido correctamente.');
                    $('#formulario').trigger('reset'); // Limpiar formulario
                    $('#formulario').hide(); // Ocultar formulario
                },
                error: function () {
                    alert('Error al añadir el usuario.');
                }
            });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
});