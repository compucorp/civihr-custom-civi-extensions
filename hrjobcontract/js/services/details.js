console.log('detailsService');
define(['services/services'], function (services) {
    services.factory('DetailsService', function () {
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
                    "notice_amount": "2",
                    "notice_unit": "Month",
                    "notice_amount_employee": "0",
                    "notice_unit_employee": "",
                    "location": "London",
                    "is_primary": "1",
                    "jobcontract_revision_id": "92"
                }]
            };
        };
        return items;
    });
});