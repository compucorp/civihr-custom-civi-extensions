define(['controllers/controllers'], function(controllers){    controllers.controller('ExampleCtrl',['$scope', '$log', '$routeParams', 'ExampleService', '$route', '$timeout',        function($scope, $log, $routeParams, ExampleService, $route, $timeout){            $log.debug('Controller: ExampleCtrl');            // Tracks collapsed / expanded rows            $scope.collapsedRows = [];            // Tracks clicked tabs per each row            $scope.view_tab = [];            // Tracks edit data changes on the forms            $scope.edit_data = [];            // Array for data backup            $scope.backup_data = [];            // Set the filter to show only the Active items as default            $scope.currentFilterId = 1;            // Define the add new role URL            $scope.add_new_role_url = $scope.$parent.pathBaseUrl + $scope.$parent.pathIncludeTpl + 'add_new_role.html';            // Store the contractsData            $scope.contractsData = [];            // Implement angular tabs            $scope.changeTab = function(row_id, tab_id) {                $scope.view_tab[row_id] = tab_id;            };            // Check if current tab            $scope.isTab = function(row_id, tab_id) {                if ($scope.view_tab[row_id] == tab_id) {                    return true;                }                return false;            };            // Check for collapsed rows            $scope.isThingsCollapsed = function(row_id) {                if ($scope.collapsedRows[row_id] == true) {                    return true;                }                else if ($scope.collapsedRows[row_id] == false) {                    return false;                }                return true;            };            // Collapse the row or Expand when clicked            $scope.collapseRow = function(row_id) {                // If already collapsed, expand                if ($scope.collapsedRows[row_id] == false) {                    $scope.collapsedRows[row_id] = true;                }                else {                    $scope.collapsedRows[row_id] = false;                }            };            // Set the data from the webservice call + create backup data, if we need to revert the form            $scope.initData = function(row_id, form_id, data) {                $scope.edit_data[row_id] = [];                $scope.edit_data[row_id][form_id] = data;                $scope.backup_data[row_id] = [];                $scope.backup_data[row_id][form_id] = data;            }            // Data restore on the form            $scope.resetData = function(row_id) {                setTimeout(function() {                    // Restore                    $scope.edit_data[row_id]['title'] = $scope.backup_data[row_id]['title'];                    $scope.edit_data[row_id]['is_edit'] = false;                    $scope.$apply();                }, 5);            }            // Check if the data are changed in the form (based on job role ID)            $scope.isChanged = function(row_id) {                // If there are data it means we edited the form                if ($scope.edit_data[row_id]['is_edit'] == true) {                    return true;                }                return false;            }            // Set the is_edit value            $scope.showSave = function(row_id) {                console.log($scope.edit_data);                $scope.edit_data[row_id]['is_edit'] = true;            }            // Saves the new Job Role            $scope.saveNewRole = function(data) {                console.log('save');                $route.reload();            };            // Sets the add new job role form visibility            $scope.add_new_role = function() {                $scope.add_new = true;            }            // Removes the Role based on Role ID            $scope.removeRole = function(row_id) {                console.log('delete');                // Delete job role                deleteJobRole(row_id);                // Get job roles based on the passed Contact ID                getJobRolesList($scope.$parent.contactId);            };            $scope.filterItems = [ {id: 1, name: 'Active'}, {id: 2, name: 'Inactive'}];            $scope.filterChange = function() {                $scope.currentFilterId = $scope.currentFilter.id;                console.log($scope.currentFilterId, $scope.currentFilter);            }            // Variable to check if we adding new job role            var job_roles = this;            // Get job roles based on the passed Contact ID            getJobRolesList($scope.$parent.contactId);            // Get Job Contracts based on the passed Contact ID            function getContracts(contact_id) {                ExampleService.getContracts(contact_id).then(function(data){                        console.log(data);                },                function(errorMessage){                    $scope.error = errorMessage;                });            }            // Implements the "getAllJobRoles" service            function getJobRolesList(contact_id) {                // Get the job contracts for the contact                ExampleService.getContracts(contact_id).then(function(data){                        console.log(data);                        var job_contract_ids = [];                        var contractsData= [];                        // If we have job contracts, try to get the job roles for the contract                        if (data.count != 0) {                            for (var i = 0; i < data.count; i++) {                                console.log(data.values[i]['id']);                                // Job contract IDs which will be passed to the "getAllJobRoles" service                                job_contract_ids.push(data.values[i]['id']);                                contractsData.push({id: data.values[i]['id'], title: data.values[i]['title']});                            }                            // Store the ContractsData what we can reuse later                            job_roles.contractsData = contractsData;                            console.log(job_roles);                            ExampleService.getAllJobRoles(job_contract_ids).then(function(data){                                    job_roles.getData = data.values;                                    if (data.is_error == 1) {                                        job_roles.status = 'Data load failure';                                    }                                    else {                                        if (data.count == 0) {                                            job_roles.empty = 'No Job Roles found!';                                        }                                        console.log(job_roles);                                        job_roles.status = 'Data load OK';                                    }                            },                            function(errorMessage){                                $scope.error = errorMessage;                            });                        }                        else {                            console.log('no job contract');                            job_roles.empty = 'No Job Contracts found for this Contact!';                        }                },                function(errorMessage){                    $scope.error = errorMessage;                });            }            // Implements the "deleteJobRole" service            function deleteJobRole(job_role_id) {                ExampleService.deleteJobRole(job_role_id).then(function(data){                        if (data.is_error == 1) {                            job_roles.message_type = 'alert-danger';                            job_roles.message = 'Role delete failure!';                        }                        else {                            job_roles.message_type = 'alert-success';                            job_roles.message = 'Role deleted successfully!';                        }                        // Hide the message after some seconds                        $timeout(function() {                            job_roles.message = null;                        }, 3000);                    },                    function(errorMessage){                        $scope.error = errorMessage;                    });            }        }]);});