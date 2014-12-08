console.log('ContractListService');
define(['services/services'], function (services) {
    services.factory('ContractListService', function () {
        var items = {};

        items.query = function () {
            return {
                "is_error": 0,
                "version": 3,
                "count": 1,
                "id": 26,
                "values": [{
                    "id": "12",
                    "position": "General Manager",
                    "title": "General Manager",
                    "funding_notes": "Notes",
                    "contract_type": "Apprentice",
                    "period_type": "",
                    "period_start_date": "2014-08-26",
                    "period_end_date": "Unspecified",
                    "notice_amount": "3",
                    "notice_unit": "Month",
                    "notice_amount_employee": "0",
                    "notice_unit_employee": "",
                    "location": "Headquarters",
                    "is_primary": "1",
                    "jobcontract_revision_id": "92"
                },{
                    "id": "11",
                    "position": "Front-end Developer",
                    "title": "Front-end Developer",
                    "funding_notes": "Notes",
                    "contract_type": "Apprentice",
                    "period_type": "",
                    "period_start_date": "2014-08-26",
                    "period_end_date": "Unspecified",
                    "notice_amount": "3",
                    "notice_unit": "Month",
                    "notice_amount_employee": "0",
                    "notice_unit_employee": "",
                    "location": "Headquarters",
                    "is_primary": "0",
                    "jobcontract_revision_id": "92"
                },{
                    "id": "10",
                    "position": "Back-end Developer",
                    "title": "Back-end Developer",
                    "funding_notes": "Notes",
                    "contract_type": "Apprentice",
                    "period_type": "",
                    "period_start_date": "2014-08-26",
                    "period_end_date": "Unspecified",
                    "notice_amount": "3",
                    "notice_unit": "Month",
                    "notice_amount_employee": "0",
                    "notice_unit_employee": "",
                    "location": "Headquarters",
                    "is_primary": "0",
                    "jobcontract_revision_id": "92"
                }]
            };
        };
        return items;
    });
});