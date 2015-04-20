'use strict';

commonApp.factory('pvMockDataService',
    function () {
        return {
            getMockMenu: function() {
                return [
                    {
                        menuName: 'Patient',
                        menuIconClass: 'icon-user-md',
                        isActive: false,
                        isOpen: false,
                        menuId: 1,
                        ngApp: '',
                        serverRoute: '',
                        ngRoute: '',
                        showSubMenu: true,
                        subMenuItems: [
                            {
                                menuName: 'Search',
                                isActive: false,
                                menuId: 3,
                                ngApp: 'pvPatientServices',
                                serverRoute: 'PatientServices',
                                ngRoute: 'patientSearch',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'My Info',
                                isActive: false,
                                menuId: 4,
                                ngApp: 'pvPatientServices',
                                serverRoute: 'PatientServices',
                                ngRoute: 'myInfo',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Payer / Insurance',
                                isActive: false,
                                menuId: 5,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            }
                        ]
                    },
                    {
                        menuName: 'Help Menu',
                        menuIconClass: 'icon-question-sign',
                        isActive: false,
                        isOpen: false,
                        menuId: 41,
                        ngApp: '',
                        serverRoute: '',
                        ngRoute: '',
                        showSubMenu: true,
                        subMenuItems: [
                            {
                                menuName: 'Help Documents',
                                isActive: false,
                                menuId: 42,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Home Page',
                                isActive: false,
                                menuId: 43,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            }
                        ]
                    }
                ];
            },
            getMockDefaultRoute: function() {
                return {
                    menuId: 3,
                    ngApp: 'pvPatientServices',
                    serverRoute: 'PatientServices',
                    ngRoute: 'patientSearch'
                };
            },
        };
    }
);