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
                                menuName: 'LogBook',
                                isActive: false,
                                menuId: 2,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Summary',
                                isActive: false,
                                menuId: 3,
                                ngApp: 'pvPatientRegistration',
                                serverRoute: 'PatientRegistration',
                                ngRoute: 'patientSearch',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Demographic',
                                isActive: false,
                                menuId: 4,
                                ngApp: 'pvPatientRegistration',
                                serverRoute: 'PatientRegistration',
                                ngRoute: 'registerPatient',
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
                            },
                            {
                                menuName: 'Receivable',
                                isActive: false,
                                menuId: 6,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            }
                        ]
                    },
                    {
                        menuName: 'Admin1',
                        menuIconClass: 'icon-cog',
                        isActive: false,
                        isOpen: false,
                        menuId: 7,
                        ngApp: '',
                        serverRoute: '',
                        ngRoute: '',
                        showSubMenu: true,
                        subMenuItems: [
                            {
                                menuName: 'Charge Entry',
                                isActive: false,
                                menuId: 8,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Payment',
                                isActive: false,
                                menuId: 9,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Fee Schedule',
                                isActive: false,
                                menuId: 10,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Insurance',
                                isActive: false,
                                menuId: 11,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Corp. Protocol',
                                isActive: false,
                                menuId: 12,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Chart Review',
                                isActive: false,
                                menuId: 13,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'EPS Work Queue',
                                isActive: false,
                                menuId: 14,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            }
                        ]
                    },
                    {
                        menuName: 'Admin2',
                        menuIconClass: 'icon-cog',
                        isActive: false,
                        isOpen: false,
                        menuId: 15,
                        ngApp: '',
                        serverRoute: '',
                        ngRoute: '',
                        showSubMenu: true,
                        subMenuItems: [
                            {
                                menuName: 'Billing Tasks',
                                isActive: false,
                                menuId: 16,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'RefundsBatch',
                                isActive: false,
                                menuId: 17,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Documents',
                                isActive: false,
                                menuId: 18,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Work List',
                                isActive: false,
                                menuId: 19,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Month End',
                                isActive: false,
                                menuId: 20,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Reports',
                                isActive: false,
                                menuId: 21,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'First Data Admin',
                                isActive: false,
                                menuId: 22,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Patient Statements',
                                isActive: false,
                                menuId: 23,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            }
                        ]
                    },
                    {
                        menuName: 'Resource',
                        menuIconClass: 'icon-book',
                        isActive: false,
                        isOpen: false,
                        menuId: 24,
                        ngApp: '',
                        serverRoute: '',
                        ngRoute: '',
                        showSubMenu: true,
                        subMenuItems: [
                            {
                                menuName: 'Diagnosis/IDC9',
                                isActive: false,
                                menuId: 25,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Diagnosis/CPT4',
                                isActive: false,
                                menuId: 26,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Practice/Clinic',
                                isActive: false,
                                menuId: 27,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Provider Info',
                                isActive: false,
                                menuId: 28,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Primary Physician Info',
                                isActive: false,
                                menuId: 29,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Facility',
                                isActive: false,
                                menuId: 30,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            }
                        ]
                    },
                    {
                        menuName: 'Personal',
                        menuIconClass: 'icon-user',
                        isActive: false,
                        isOpen: false,
                        menuId: 31,
                        ngApp: '',
                        serverRoute: '',
                        ngRoute: '',
                        showSubMenu: true,
                        subMenuItems: [
                            {
                                menuName: 'Profile',
                                isActive: false,
                                menuId: 32,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            }
                        ]
                    },
                    {
                        menuName: 'System',
                        menuIconClass: 'icon-edit',
                        isActive: false,
                        isOpen: false,
                        menuId: 33,
                        ngApp: '',
                        serverRoute: '',
                        ngRoute: '',
                        showSubMenu: true,
                        subMenuItems: [
                            {
                                menuName: 'User List',
                                isActive: false,
                                menuId: 34,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Menu List',
                                isActive: false,
                                menuId: 35,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Utility',
                                isActive: false,
                                menuId: 36,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Tools',
                                isActive: false,
                                menuId: 37,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'App Error Log',
                                isActive: false,
                                menuId: 38,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'Quick Visits',
                                isActive: false,
                                menuId: 39,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error500',
                                showSubMenu: false,
                                subMenuItems: []
                            },
                            {
                                menuName: 'RTE Payor IDs',
                                isActive: false,
                                menuId: 40,
                                ngApp: 'pvError',
                                serverRoute: 'Error',
                                ngRoute: 'error404',
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
                    ngApp: 'pvPatientRegistration',
                    serverRoute: 'PatientRegistration',
                    ngRoute: 'registerPatient'
                };
            },
        };
    }
);