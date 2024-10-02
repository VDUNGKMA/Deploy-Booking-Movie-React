export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manager-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },
            {
                name: 'menu.admin.manager-doctor', link: '/system/tickets'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manager-admin', link: '/system/user-admin'

            // }

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            //Quản lý kế hoạch khám bênh bác sĩ



            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quản lý phòng khám
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
    { //Quản lý cẩm nang
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

];
export const doctorMenu = [
    {
        name: 'menu.admin.manager-user',

        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',


            },
            //Quản lý bệnh nhân khám bệnh

            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            }
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },




];