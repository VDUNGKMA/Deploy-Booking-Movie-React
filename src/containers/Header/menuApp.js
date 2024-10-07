export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manager-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },

            // {
            //     name: 'menu.admin.manager-admin', link: '/system/user-admin'

            // }

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            //Quản lý kế hoạch khám bênh bác sĩ



            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quản lý phim
        name: 'menu.admin.movie',
        menus: [
            {
                name: 'menu.admin.manage-movie', link: '/system/manage-movie'

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            }
        ]
    },
    { //Quản lý thể loại phim
        name: 'menu.admin.genres',
        menus: [
            {
                name: 'menu.admin.manage-genres', link: '/system/manage-genres'

            },
        ]
    },
    { //Quản lý suất chiếu
        name: 'menu.admin.show-time',
        menus: [
            {
                name: 'menu.admin.manage-show-time', link: '/system/showtimes/select'

            },
        ]
    },

    {// Quản lý rạp chiếu phim
        name: 'menu.admin.cinemas',
        menus: [
            { name: 'menu.admin.manage-cinemas', link: '/system/manage-cinemas' }
        ]

    },
    {// Quản lý vé
        name: 'menu.admin.tickets',
        menus: [
            {
                name: 'menu.admin.manage-tickets', link: '/system/tickets'
            },
        ]

    },
    {// Thống kê
        name: 'menu.admin.revenue',
        menus: [
            {
                name: 'menu.admin.manage-revenue', link: '/system/revenue'
            },
            {
                name: 'menu.admin.manage-revenue-by-movie', link: '/system/revenue-by-movie'
            },
            {
                name: 'menu.admin.manage-revenue-by-showtime', link: '/system/revenue-by-showtime'
            },

        ]

    },


];
export const doctorMenu = [
    { //Quản lý thể loại phim
        name: 'menu.staff.screening-room',
        menus: [
            {
                name: 'menu.staff.manag-screening-room', link: '/system/staff/theater'

            },
        ]
    },
    { //Quản lý suất chiếu
        name: 'menu.staff.validate_ticket',
        menus: [
            {
                name: 'menu.staff.manage-validate_ticket', link: '/system/staff/scan-qr'

            },
        ]
    },




];