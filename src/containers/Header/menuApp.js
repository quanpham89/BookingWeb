export const adminMenu = [

    { //quản lí người dùng
        name: 'menu.admin.manage-user', 
        menus: [
            // {
            //     name: 'menu.admin.manage-user', link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            // {
            //     name: 'menu.admin.crud', link: '/system/crud'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]

    },
    { //quản lí phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]

    },
    { //quản lí Chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                // Quản lí kế hoạch khám của bác sĩ
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]

    },
    { //quản lí cẩm nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]

    },
];

export const doctorMenu = [

    { //quản lí kế hoạch khám bệnh bác sĩ
        name: 'menu.doctor.manage-schedule-of-doctor', 
        menus: [
            // {
            //     name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            // },
            {
                name: 'menu.doctor.manage-schedule-of-doctor', link: '/doctor/manage-schedule-of-doctor',
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    },
    { //quản lí cẩm nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]

    },
    
];