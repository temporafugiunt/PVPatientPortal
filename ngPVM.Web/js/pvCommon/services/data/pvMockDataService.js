'use strict';

commonApp.factory('pvMockDataService',
    function () {
      return {
        getMockMenu: function () {
          return [
              {
                menuName: 'Patient Services',
                menuIconClass: 'icon-user',
                isActive: false,
                isOpen: false,
                menuId: 1,
                ngApp: '',
                serverRoute: '',
                ngRoute: '',
                showSubMenu: true,
                subMenuItems: [
                    {
                      menuName: 'API Tester',
                      isActive: false,
                      menuId: 3,
                      ngApp: 'pvPatientServices',
                      serverRoute: 'PatientServices',
                      ngRoute: 'apiTester',
                      showSubMenu: false,
                      subMenuItems: []
                    },
                    {
                      menuName: 'My Virtual Encounters',
                      isActive: false,
                      menuId: 4,
                      ngApp: 'pvPatientServices',
                      serverRoute: 'PatientServices',
                      ngRoute: 'myInfo',
                      showSubMenu: false,
                      subMenuItems: []
                    }
                ]
              },
          {
            menuName: 'Provider Services',
            menuIconClass: 'icon-user-md',
            isActive: false,
            isOpen: false,
            menuId: 21,
            ngApp: '',
            serverRoute: '',
            ngRoute: '',
            showSubMenu: true,
            subMenuItems: [
              {
                menuName: 'Virtual Encounters',
                isActive: false,
                menuId: 22,
                ngApp: 'pvPatientServices',
                serverRoute: 'PatientServices',
                ngRoute: 'providerInfo',
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
        getMockDefaultRoute: function () {
          return {
            menuId: 4,
            ngApp: 'pvPatientServices',
            serverRoute: 'PatientServices',
            ngRoute: 'myInfo'
          };
        },
      };
    }
);