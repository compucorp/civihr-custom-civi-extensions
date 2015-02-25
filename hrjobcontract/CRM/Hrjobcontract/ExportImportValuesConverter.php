<?php

class CRM_Hrjobcontract_ExportImportValuesConverter
{
    static private $_singleton = NULL;
    
    protected $_annualOptions = array();
    protected $_annualOptionsFlipped = array();
    protected $_hoursLocationOptions = array();
    protected $_hoursTypeOptions = array();
    protected $_hoursTypeOptionsFlipped = array();
    protected $_leaveTypes = array();
    protected $_leaveTypesFlipped = array();
    protected $_payCycleOptions = array();
    protected $_payCycleOptionsFlipped = array();
    protected $_payScaleOptions = array();
    
    private function __construct()
    {
        $this->_initialize();
    }
    
    /**
     * singleton function used to manage this object
     *
     * @return CRM_Hrjobcontract_ExportImportValuesConverter
     * @static
     */
    static function &singleton()
    {
        if (self::$_singleton === NULL)
        {
            self::$_singleton = new self;
        }
        return self::$_singleton;
    }
    
    protected function _initialize()
    {
        // annual benefits options:
        CRM_Core_OptionGroup::getAssoc('hrjc_benefit_name', $this->_annualOptions['benefit']['name']);
        CRM_Core_OptionGroup::getAssoc('hrjc_benefit_type', $this->_annualOptions['benefit']['type']);
        foreach ($this->_annualOptions['benefit']['name']['name'] as $key => $value)
        {
            $this->_annualOptionsFlipped['benefit']['name'][$value] = $key;
        }
        foreach ($this->_annualOptions['benefit']['type']['name'] as $key => $value)
        {
            $this->_annualOptionsFlipped['benefit']['type'][$value] = $key;
        }
        
        // annual deductions options:
        CRM_Core_OptionGroup::getAssoc('hrjc_deduction_name', $this->_annualOptions['deduction']['name']);
        CRM_Core_OptionGroup::getAssoc('hrjc_deduction_type', $this->_annualOptions['deduction']['type']);
        foreach ($this->_annualOptions['deduction']['name']['name'] as $key => $value)
        {
            $this->_annualOptionsFlipped['deduction']['name'][$value] = $key;
        }
        foreach ($this->_annualOptions['deduction']['type']['name'] as $key => $value)
        {
            $this->_annualOptionsFlipped['deduction']['type'][$value] = $key;
        }
        
        // hours location options:
        $hoursLocation = new CRM_Hrjobcontract_BAO_HoursLocation();
        $hoursLocation->find();
        while ($hoursLocation->fetch()) {
            $this->_hoursLocationOptions[$hoursLocation->id] = (array)$hoursLocation;
        }
        
        // hours type options:
        $hoursTypeOptions = array();
        CRM_Core_OptionGroup::getAssoc('hrjc_hours_type', $hoursType, true);
        foreach ($hoursType as $hourType) {
            $this->_hoursTypeOptions[$hourType['value']] = $hourType;
            $this->_hoursTypeOptionsFlipped[$hourType['label']] = $hourType['value'];
        }
        
        // leave types options:
        $absenceType = new CRM_HRAbsence_BAO_HRAbsenceType();
        $absenceType->find();
        while ($absenceType->fetch()) {
            $absenceTypeArray = (array)$absenceType;
            $this->_leaveTypes[$absenceType->id] = $absenceTypeArray;
            $this->_leaveTypesFlipped[$absenceTypeArray['title']] = $absenceType->id;
        }
        
        // pay cycle options:
        $payCycleOptions = array();
        CRM_Core_OptionGroup::getAssoc('hrjc_pay_cycle', $payCycleOptions, true);
        foreach ($payCycleOptions as $payCycle) {
            $this->_payCycleOptions[$payCycle['value']] = $payCycle;
            $this->_payCycleOptionsFlipped[$payCycle['label']] = $payCycle['value'];
        }
        
        // pay scale options:
        $payScale = new CRM_Hrjobcontract_BAO_PayScale();
        $payScale->find();
        while ($payScale->fetch()) {
            $this->_payScaleOptions[$payScale->id] = (array)$payScale;
        }
    }
    
    public function export($entityName, $fieldName, $value)
    {
        $functionName = $entityName . '_' . $fieldName . '_export';
        if (is_callable(array($this, $functionName)))
        {
            return self::$functionName($value);
        }
        return $value;
    }
    
    public function import($entityName, $fieldName, $value)
    {
        $functionName = $entityName . '_' . $fieldName . '_import';
        if (is_callable(array($this, $functionName)))
        {
            return self::$functionName($value);
        }
        return $value;
    }
    
    public function details_is_primary_export($value)
    {
        return (int)$value ? 'Yes' : 'No';
    }
    public function details_is_primary_import($value)
    {
        return strtolower($value) === 'yes' ? 1 : 0;
    }
    
    public function hour_hours_type_export($value)
    {
        return !empty($value) ? $this->_hoursTypeOptions[$value]['label'] : null;
    }
    public function hour_hours_type_import($value)
    {
        return !empty($value) ? $this->_hoursTypeOptionsFlipped[$value] : null;
    }
    
    public function hour_location_standard_hours_export($value)
    {
        return !empty($value) ? $this->_hoursLocationOptions[$value]['location'] . ' - ' .
            $this->_hoursLocationOptions[$value]['standard_hours'] . ' hours per ' .
            $this->_hoursLocationOptions[$value]['periodicity'] : null;
    }
    public function hour_location_standard_hours_import($value)
    {
        if (empty($value))
        {
            return null;
        }
        $keys = preg_split("/( - | hours per )/", $value);
        foreach ($this->_hoursLocationOptions as $key => $hoursLocationOption)
        {
            if ($hoursLocationOption['location'] === $keys[0] &&
                $hoursLocationOption['standard_hours'] === $keys[1] &&
                $hoursLocationOption['periodicity'] === $keys[2])
            {
                return $key;
            }
        }
        return $value;
    }
    
    public function leave_leave_amount_export($value)
    {
        $leaves = explode(',', $value);
        $output = array();
        foreach ($leaves as $leave)
        {
            list($typeId, $leaveAmount) = explode(':', $leave);
            $output[] = $this->_leaveTypes[$typeId]['title'] . ': ' . $leaveAmount;
        }
        return implode(', ', $output);
    }
    public function leave_leave_amount_import($value)
    {
        if (is_array($value) && !empty($value[0]['leave_amount']))
        {
            $value = $value[0]['leave_amount'];
        }
        
        $leaves = explode(',', $value);
        $output = array();
        foreach ($leaves as $leave)
        {
            list($typeTitle, $leaveAmount) = explode(':', $leave);
            $output[$this->_leaveTypesFlipped[trim($typeTitle)]] = trim($leaveAmount);
        }
        
        return $output;
    }
    
    public function leave_leave_type_export($value)
    {
        $typeIds = explode(',', $value);
        $typeTitles = array();
        foreach ($typeIds as $typeId)
        {
            $typeTitles[] = $this->_leaveTypes[$typeId]['title'];
        }
        return implode(', ', $typeTitles);
    }
    public function leave_leave_type_import($value)
    {
        //return !empty($value) ? $this->_leaveTypesFlipped[$value] : null;
        return null;
    }
    
    public function pay_annual_benefits_export($value)
    {
        return !empty($value) ? $this->_getAnnualReadableValues('benefit', $value) : null;
    }
    public function pay_annual_benefits_import($value)
    {
        return !empty($value) ? $this->_getAnnualValues('benefit', $value) : null;
    }
    
    public function pay_annual_deductions_export($value)
    {
        return !empty($value) ? $this->_getAnnualReadableValues('deduction', $value) : null;
    }
    public function pay_annual_deductions_import($value)
    {
        return !empty($value) ? $this->_getAnnualValues('deduction', $value) : null;
    }
    
    public function pay_pay_cycle_export($value)
    {
        return !empty($value) ? $this->_payCycleOptions[$value]['label'] : null;
    }
    public function pay_pay_cycle_import($value)
    {
        return !empty($value) ? $this->_payCycleOptionsFlipped[$value] : null;
    }
    
    public function pay_pay_is_auto_est_export($value)
    {
        return (int)$value ? 'Yes' : 'No';
    }
    public function pay_pay_is_auto_est_import($value)
    {
        return strtolower($value) === 'yes' ? 1 : 0;
    }
    
    public function pay_is_paid_export($value)
    {
        return (int)$value ? 'Yes' : 'No';
    }
    public function pay_is_paid_import($value)
    {
        return strtolower($value) === 'yes' ? 1 : 0;
    }
    
    public function pay_pay_scale_export($value)
    {
        $result = '';
        if (!empty($value)) {
            $result = $this->_payScaleOptions[$value]['pay_scale'];
            if ($value != 8)
            {
                $result .= ' - ' .
                $this->_payScaleOptions[$value]['pay_grade'] . ' - ' .
                $this->_payScaleOptions[$value]['currency'] . ' ' .
                $this->_payScaleOptions[$value]['amount'] . ' per ' .
                $this->_payScaleOptions[$value]['periodicity'];
            }
        }
        return $result;
    }
    public function pay_pay_scale_import($value)
    {
        if (empty($value))
        {
            return null;
        }
        if ($this->_payScaleOptions[8]['pay_scale'] == $value)
        {
            return 8;
        }
        $keys = preg_split("/( - | per )/", $value);
        $parts = explode(' ', $keys[2]);
        foreach ($this->_payScaleOptions as $key => $payScaleOption)
        {
            if ($payScaleOption['pay_scale'] === $keys[0] &&
                $payScaleOption['pay_grade'] === $keys[1] &&
                $payScaleOption['currency'] === $parts[0] &&
                $payScaleOption['amount'] === $parts[1] &&
                $payScaleOption['periodicity'] === $keys[3])
            {
                return $key;
            }
        }
        return $value;
    }
    
    public function pension_is_enrolled_export($value)
    {
        $result = '';
        switch ((int)$value)
        {
            case 0:
                $result = 'No';
            break;
            case 1:
                $result = 'Yes';
            break;
            case 2:
                $result = 'Opted out';
            break;
        }
        return $result;
    }
    public function pension_is_enrolled_import($value)
    {
        $result = null;
        switch (strtolower($value))
        {
            case 'no':
                $result = 0;
            break;
            case 'yes':
                $result = 1;
            break;
            case 'opted out':
                $result = 2;
            break;
        }
        return $result;
    }
    
    protected function _getAnnualReadableValues($field, $json)
    {
        $list = json_decode($json, true);
        $output = '';
        if (!empty($list))
        {
            foreach ($list as $row)
            {
                $output .= 'name: ' . $this->_annualOptions[$field]['name']['name'][$row['name']] . ', ';
                $output .= 'type: ' . $this->_annualOptions[$field]['type']['name'][$row['type']] . ', ';
                $output .= 'amount pct: ' . $row['amount_pct'] . ', ';
                $output .= 'amount abs: ' . $row['amount_abs'] . '; ';
            }
        }
        return $output;
    }
    
    protected function _getAnnualValues($field, $value)
    {
        if (empty($value))
        {
            return null;
        }
        $outputArray = array();
        $rows = explode(';', $value);
        foreach ($rows as $row)
        {
            $row = trim($row);
            if (empty($row))
            {
                continue;
            }
            $outputRow = array();
            $columns = explode(', ', $row);
            foreach ($columns as $column)
            {
                $pair = explode(': ', $column);
                $k = $pair[0];
                $v = !empty($pair[1]) ? $pair[1] : '';
                switch ($k)
                {
                    case 'amount pct':
                        $outputRow['amount_pct'] = $v;
                    break;
                    case 'amount abs':
                        $outputRow['amount_abs'] = $v;
                    break;
                    default:
                        $outputRow[$k] = $this->_annualOptionsFlipped[$field][$k][$v];
                    break;
                }
            }
            $outputArray[] = $outputRow;
        }
        return $outputArray;
    }
}
