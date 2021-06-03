<?php
/*
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

class Google_Service_Spanner_ContextValue extends Google_Model
{
  protected $labelType = 'Google_Service_Spanner_LocalizedString';
  protected $labelDataType = '';
  public $severity;
  public $unit;
  public $value;

  /**
   * @param Google_Service_Spanner_LocalizedString
   */
  public function setLabel(Google_Service_Spanner_LocalizedString $label)
  {
    $this->label = $label;
  }
  /**
   * @return Google_Service_Spanner_LocalizedString
   */
  public function getLabel()
  {
    return $this->label;
  }
  public function setSeverity($severity)
  {
    $this->severity = $severity;
  }
  public function getSeverity()
  {
    return $this->severity;
  }
  public function setUnit($unit)
  {
    $this->unit = $unit;
  }
  public function getUnit()
  {
    return $this->unit;
  }
  public function setValue($value)
  {
    $this->value = $value;
  }
  public function getValue()
  {
    return $this->value;
  }
}
