﻿Type.registerNamespace("Sys.Extended.UI");Sys.Extended.UI.PasswordStrengthExtenderBehavior=function(n){Sys.Extended.UI.PasswordStrengthExtenderBehavior.initializeBase(this,[n]);this._levelArray=[];this._styleArray=[];this._txtPwdStrengthCssClass=null;this._barBorderCssClass=null;this._barIndicatorCssClass=null;this._displayPosition=Sys.Extended.UI.DisplayPosition.RightSide;this._strengthIndicator=Sys.Extended.UI.StrengthIndicatorTypes.Text;this._preferredPasswordLength=0;this._minimumNumericCharacters=0;this._minimumSymbolCharacters=0;this._requiresUpperAndLowerCaseCharacters=!1;this._helpHandleCssClass="";this._helpHandlePosition=Sys.Extended.UI.DisplayPosition.AboveRight;this._helpText="";this._helpStatusLabelID=null;this._displayDiv=null;this._helpDiv=null;this._barOuterDiv=null;this._barInnerDiv=null;this._keyPressHandler=null;this._blurHandler=null;this._helpClickHandler=null;this._prefixText=Sys.Extended.UI.Resources.PasswordStrength_StrengthPrompt;this._txtStrengthDescriptions=Sys.Extended.UI.Resources.PasswordStrength_DefaultStrengthDescriptions;this._strengthStyles="";this._barIndicatorStyles="";this._txtseparator=";";this._MIN_TXT_LEVEL_COUNT=2;this._MAX_TXT_LEVEL_COUNT=10;this._calcWeightings="50;15;15;20";this._minLowerCaseChars=0;this._minUpperCaseChars=0};Sys.Extended.UI.PasswordStrengthExtenderBehavior.prototype={initialize:function(){Sys.Extended.UI.PasswordStrengthExtenderBehavior.callBaseMethod(this,"initialize");this._createIndicatorDisplayElement();var n=this.get_element();this._keyPressHandler=Function.createDelegate(this,this._onKeyPress);this._blurHandler=Function.createDelegate(this,this._onBlur);$addHandler(n,"keyup",this._keyPressHandler);$addHandler(n,"blur",this._blurHandler);(this._preferredPasswordLength==null||this._preferredPasswordLength==""||this._preferredPasswordLength<=0)&&(this._preferredPasswordLength=10,this.raisePropertyChanged("PreferredPasswordLength"));(this._calcWeightings==null||this._calcWeightings=="")&&(this._calcWeightings="50;15;15;20",this.raisePropertyChanged("CalculationWeightings"));this._getPasswordStrength()},_createIndicatorDisplayElement:function(){if(this._strengthIndicator==Sys.Extended.UI.StrengthIndicatorTypes.BarIndicator?this._createBarIndicatorDisplayElement():this._createTextDisplayElement(),this._createHelpDisplayElement()==!0){$common.setVisible(this._helpDiv,!0);var n=$common.getBounds(this.get_element()),i=$common.getBounds(this._helpDiv),r,u,t=3;this._helpHandlePosition=="LeftSide"?(r=n.y+(n.height/2-i.height/2),u=n.x-i.width):this._helpHandlePosition=="BelowRight"?(r=n.y+n.height-t,u=n.x+n.width-t):this._helpHandlePosition=="BelowLeft"?(r=n.y+n.height-t,u=n.x-i.width+t):this._helpHandlePosition=="RightSide"?(r=n.y+(n.height/2-i.height/2),u=n.x+n.width):this._helpHandlePosition=="AboveLeft"?(r=n.y-i.height+t,u=n.x-i.width+t):(r=n.y-i.height+t,u=n.x+n.width-t);this._helpDiv.style.top=r+"px";this._helpDiv.style.left=u+"px"}},_createTextDisplayElement:function(){var n=document.createElement("label");n.style.position="absolute";n.style.visibility="hidden";n.style.display="none";n.style.zIndex=Sys.Extended.UI.zIndex.PasswordStrengthTextDisplay;this.get_element().id&&(n.id=this.get_element().id+"_PasswordStrength");this._displayDiv=n;this._setTextDisplayLocation(n);document.body.appendChild(n);this._setTextDisplayStyle(0)},_setTextDisplayStyle:function(n){this._styleArray.length==0?this._txtPwdStrengthCssClass?this._displayDiv.className=this._txtPwdStrengthCssClass:this._displayDiv.style.backgroundColor="yellow":(this._displayDiv.style.backgroundColor="",this._txtPwdStrengthCssClass&&Sys.UI.DomElement.containsCssClass(this._displayDiv,this._txtPwdStrengthCssClass)&&Sys.UI.DomElement.removeCssClass(this._displayDiv,this._txtPwdStrengthCssClass),this._displayDiv.className=this._styleArray[n])},_setBarDisplayStyle:function(n){this._barBorderCssClass!=""?this._barOuterDiv.className=this._barBorderCssClass:(d1.style.width="200px",d1.style.borderStyle="solid",d1.style.borderWidth="1px");this._styleArray.length==0?this._barIndicatorCssClass!=""?this._barInnerDiv.className=this._barIndicatorCssClass:this._barInnerDiv.style.backgroundColor="red":(this._barIndicatorCssClass&&Sys.UI.DomElement.containsCssClass(this._barInnerDiv,this._barIndicatorCssClass)&&Sys.UI.DomElement.removeCssClass(this._barInnerDiv,this._barIndicatorCssClass),this._barInnerDiv.className=this._styleArray[n])},_createBarIndicatorDisplayElement:function(){var n=document.createElement("div"),t;n.style.position="absolute";n.style.visibility="hidden";n.style.display="none";t=document.createElement("div");t.style.position="absolute";t.style.visibility="hidden";t.style.display="none";n.style.height=this.get_element().offsetHeight+4+"px";this.get_element().id&&(n.id=this.get_element().id+"_PasswordStrengthBar1",t.id=this.get_element().id+"_PasswordStrengthBar2");this._barOuterDiv=n;this._barInnerDiv=t;this._extractStyles();this._setBarDisplayStyle(0);document.body.appendChild(n);document.body.appendChild(t);this._setBarDisplayLocation(n,t)},_createHelpDisplayElement:function(){if(this._helpHandleCssClass!=""){var n=document.createElement("a");return n.style.position="absolute",n.style.visibility="hidden",n.style.display="none",n.href="#",n.title=Sys.Extended.UI.Resources.PasswordStrength_GetHelpRequirements,this.get_element().id&&(n.id=this.get_element().id+"_PasswordStrengthReqDisplay"),this._helpClickHandler=Function.createDelegate(this,this._onHelpClick),$addHandler(n,"click",this._helpClickHandler),this._helpDiv=n,this._helpDiv.className=this._helpHandleCssClass,this.get_element().parentElement!=null&&this.get_element().parentElement.canHaveChildren?this.get_element().parentElement.appendChild(n):document.body.appendChild(n),!0}return!1},_setTextDisplayLocation:function(n){var t=$common.getLocation(this.get_element()),r=$common.getBounds(this.get_element()),i=15;this._displayPosition==Sys.Extended.UI.DisplayPosition.LeftSide?(n.style.top=t.y+"px",n.style.left=t.x-r.width-i+"px"):this._displayPosition=="BelowRight"?(n.style.top=t.y+this.get_element().offsetHeight+"px",n.style.left=t.x+this.get_element().offsetWidth-this.get_element().offsetWidth/4+"px"):this._displayPosition==Sys.Extended.UI.DisplayPosition.BelowLeft?(n.style.top=t.y+this.get_element().offsetHeight+"px",n.style.left=t.x-i+"px"):this._displayPosition==Sys.Extended.UI.DisplayPosition.AboveRight?(n.style.top=t.y-this.get_element().offsetHeight+"px",n.style.left=t.x+this.get_element().offsetWidth-this.get_element().offsetWidth/4+"px"):this._displayPosition==Sys.Extended.UI.DisplayPosition.AboveLeft?(n.style.top=t.y-this.get_element().offsetHeight+"px",n.style.left=t.x-i+"px"):(n.style.top=t.y+"px",n.style.left=t.x+this.get_element().offsetWidth+i+"px")},_setBarDisplayLocation:function(n,t){var i,f,h,c,e;if(this.get_element().offsetHeight>0){var o=$common.getBorderBox(n),s=$common.getPaddingBox(n),r=o.left+s.left,u=o.top+s.top;t.style.height=this.get_element().offsetHeight+"px";n.style.height=this.get_element().offsetHeight+"px";i=$common.getLocation(this.get_element());f=15;this._displayPosition==Sys.Extended.UI.DisplayPosition.LeftSide?(h=$common.getVisible(this._barOuterDiv),$common.setVisible(this._barOuterDiv,!0),c=$common.getContentSize(n),$common.setVisible(this._barOuterDiv,h),e=c.width,n.style.top=i.y+"px",n.style.left=i.x-parseInt(e)-f+"px",t.style.top=i.y+u+"px",t.style.left=i.x-parseInt(e)-f+r+"px"):this._displayPosition==Sys.Extended.UI.DisplayPosition.BelowRight?(n.style.top=i.y+this.get_element().offsetHeight+"px",n.style.left=i.x+this.get_element().offsetWidth+"px",t.style.top=i.y+this.get_element().offsetHeight+u+"px",t.style.left=i.x+this.get_element().offsetWidth+r+"px"):this._displayPosition==Sys.Extended.UI.DisplayPosition.BelowLeft?(n.style.top=i.y+this.get_element().offsetHeight+"px",n.style.left=i.x+"px",t.style.top=i.y+this.get_element().offsetHeight+u+"px",t.style.left=i.x+r+"px"):this._displayPosition==Sys.Extended.UI.DisplayPosition.AboveRight?(n.style.top=i.y-this.get_element().offsetHeight+"px",n.style.left=i.x+this.get_element().offsetWidth+"px",t.style.top=i.y-this.get_element().offsetHeight+u+"px",t.style.left=i.x+this.get_element().offsetWidth+r+"px"):this._displayPosition==Sys.Extended.UI.DisplayPosition.AboveLeft?(n.style.top=i.y-this.get_element().offsetHeight+"px",n.style.left=i.x+"px",t.style.top=i.y-this.get_element().offsetHeight+u+"px",t.style.left=i.x+r+"px"):(n.style.top=i.y+"px",n.style.left=i.x+this.get_element().offsetWidth+f+"px",t.style.top=i.y+u+"px",t.style.left=i.x+this.get_element().offsetWidth+f+r+"px")}},_showStrength:function(){var r=this.get_element(),t,n,i;r.readOnly!=!0&&(t=this._getPasswordStrength(),this._strengthIndicator==Sys.Extended.UI.StrengthIndicatorTypes.BarIndicator?($common.setVisible(this._barOuterDiv,!0),$common.setVisible(this._barInnerDiv,!0),n=0,this._styleArray!=null&&this._styleArray.length>0&&(n=parseInt(t/100*(this._styleArray.length-1))),this._setBarDisplayStyle(n),this._setBarDisplayLocation(this._barOuterDiv,this._barInnerDiv),this._showStrengthAsBarValue(t)):(this._createTextDescriptions(this._txtStrengthDescriptions),$common.setVisible(this._displayDiv,!0),n=parseInt(t/100*(this._levelArray.length-1)),i=this._levelArray[n],this._setTextDisplayStyle(n),this._setTextDisplayLocation(this._displayDiv),this._showStrengthAsText(i)))},_showStrengthAsText:function(n){this._displayDiv.innerHTML=this._prefixText+n},_showStrengthAsBarValue:function(n){var t=$common.getContentSize(this._barOuterDiv),r=$common.getPaddingBox(this._barOuterDiv),i=parseInt(t.width*(n/100));this._barInnerDiv.style.width=i+"px"},_getPasswordStrength:function(){var u=Sys.Extended.UI.TextBoxWrapper.get_Wrapper(this.get_element()).get_Value(),n="",t=0,f=this._calcWeightings.split(";"),l,a,v,i;f.length!=4&&Sys.Debug.assert(null,Sys.Extended.UI.Resources.PasswordStrength_InvalidWeightingRatios);var y=parseInt(f[0]),s=parseInt(f[1]),h=parseInt(f[2]),c=parseInt(f[3]),r=u.length/this._preferredPasswordLength;if(r>1&&(r=1),l=r*y,t+=l,r<1&&(n=String.format(Sys.Extended.UI.Resources.PasswordStrength_RemainingCharacters,this._preferredPasswordLength-u.length)),this._minimumNumericCharacters>0?(a=new RegExp("[0-9]","g"),i=this._getRegexCount(a,u),i>=this._minimumNumericCharacters&&(t+=s),i<this._minimumNumericCharacters&&(n!=""&&(n+=", "),n+=String.format(Sys.Extended.UI.Resources.PasswordStrength_RemainingNumbers,this._minimumNumericCharacters-i))):t+=r*s,this._requiresUpperAndLowerCaseCharacters==!0||typeof this._requiresUpperAndLowerCaseCharacters=="String"&&Boolean.parse(this._requiresUpperAndLowerCaseCharacters)==!0){var p=new RegExp("[a-z]","g"),w=new RegExp("[A-Z]","g"),e=this._getRegexCount(p,u),o=this._getRegexCount(w,u);e>0||o>0?e>=this._minLowerCaseChars&&o>=this._minUpperCaseChars?t+=h:(this._minLowerCaseChars>0&&this._minLowerCaseChars-e>0&&(n!=""&&(n+=", "),n+=String.format(Sys.Extended.UI.Resources.PasswordStrength_RemainingLowerCase,this._minLowerCaseChars-e)),this._minUpperCaseChars>0&&this._minUpperCaseChars-o>0&&(n!=""&&(n+=", "),n+=String.format(Sys.Extended.UI.Resources.PasswordStrength_RemainingUpperCase,this._minUpperCaseChars-o))):(n!=""&&(n+=", "),n+=Sys.Extended.UI.Resources.PasswordStrength_RemainingMixedCase)}else t+=r*h;return this._minimumSymbolCharacters>0?(v=new RegExp("[^a-z,A-Z,0-9, ]","g"),i=this._getRegexCount(v,u),i>=this._minimumSymbolCharacters&&(t+=c),i<this._minimumSymbolCharacters&&(n!=""&&(n+=", "),n+=String.format(Sys.Extended.UI.Resources.PasswordStrength_RemainingSymbols,this._minimumSymbolCharacters-i))):t+=r*c,this.set_helpText(n),t},_getRegexCount:function(n,t){var r=0,i;return t!=null&&t!=""&&(i=t.match(n),i!=null&&(r=i.length)),r},_extractStyles:function(){this._strengthStyles!=null&&this._strengthStyles!=""&&(this._styleArray=this._strengthStyles.split(this._txtseparator))},_createTextDescriptions:function(){this._levelArray=this._txtStrengthDescriptions.split(this._txtseparator);this._extractStyles();this._styleArray.length>0&&this._styleArray.length!=this._levelArray.length&&Sys.Debug.assert(!1,Sys.Extended.UI.Resources.PasswordStrength_InvalidStrengthDescriptionStyles);(this._levelArray.length<this._MIN_TXT_LEVEL_COUNT||this._levelArray>this._MAX_TXT_LEVEL_COUNT)&&Sys.Debug.assert(!1,Sys.Extended.UI.Resources.PasswordStrength_InvalidStrengthDescriptions)},_onKeyPress:function(){this._showStrength()},_onBlur:function(){this._strengthIndicator==Sys.Extended.UI.StrengthIndicatorTypes.BarIndicator?($common.setVisible(this._barOuterDiv,!1),$common.setVisible(this._barInnerDiv,!1)):$common.setVisible(this._displayDiv,!1)},_onHelpClick:function(){this._helpText==""?alert(Sys.Extended.UI.Resources.PasswordStrength_Satisfied):alert(this._helpText)},dispose:function(){var n=this.get_element();this._keyPressHandler&&($removeHandler(n,"keyup",this._keyPressHandler),this._keyPressHandler=null);this._blurHandler&&($removeHandler(n,"blur",this._blurHandler),this._blurHandler=null);this._helpClickHandler&&($removeHandler(this._helpDiv,"click",this._helpClickHandler),this._helpClickHandler=null);this._displayDiv&&$common.setVisible(this._displayDiv,!1);this._barOuterDiv&&$common.setVisible(this._barOuterDiv,!1);this._barInnerDiv&&$common.setVisible(this._barInnerDiv,!1);this._helpHandleCssClass!=""&&this._helpDiv&&$common.setVisible(this._helpDiv,!1);Sys.Extended.UI.PasswordStrengthExtenderBehavior.callBaseMethod(this,"dispose")},get_preferredPasswordLength:function(){return this._preferredPasswordLength},set_preferredPasswordLength:function(n){this._preferredPasswordLength!=n&&(this._preferredPasswordLength=n,this.raisePropertyChanged("preferredPasswordLength"))},get_PreferredPasswordLength:function(){return Sys.Extended.Deprecated("get_PreferredPasswordLength()","get_preferredPasswordLength()"),this.get_preferredPasswordLength()},set_PreferredPasswordLength:function(n){Sys.Extended.Deprecated("set_PreferredPasswordLength(value)","set_preferredPasswordLength(value)");this.set_preferredPasswordLength(n)},get_minimumNumericCharacters:function(){return this._minimumNumericCharacters},set_minimumNumericCharacters:function(n){this._minimumNumericCharacters!=n&&(this._minimumNumericCharacters=n,this.raisePropertyChanged("minimumNumericCharacters"))},get_MinimumNumericCharacters:function(){return Sys.Extended.Deprecated("get_MinimumNumericCharacters()","get_minimumNumericCharacters()"),this.get_minimumNumericCharacters()},set_MinimumNumericCharacters:function(n){Sys.Extended.Deprecated("set_MinimumNumericCharacters(value)","set_minimumNumericCharacters(value)");this.set_minimumNumericCharacters(n)},get_minimumSymbolCharacters:function(){return this._minimumSymbolCharacters},set_minimumSymbolCharacters:function(n){this._minimumSymbolCharacters!=n&&(this._minimumSymbolCharacters=n,this.raisePropertyChanged("minimumSymbolCharacters"))},get_MinimumSymbolCharacters:function(){return Sys.Extended.Deprecated("get_MinimumSymbolCharacters()","get_minimumSymbolCharacters()"),this.get_minimumSymbolCharacters()},set_MinimumSymbolCharacters:function(n){Sys.Extended.Deprecated("set_MinimumSymbolCharacters(value)","set_minimumSymbolCharacters(value)");this.set_minimumSymbolCharacters(n)},get_requiresUpperAndLowerCaseCharacters:function(){return this._requiresUpperAndLowerCaseCharacters},set_requiresUpperAndLowerCaseCharacters:function(n){this._requiresUpperAndLowerCaseCharacters!=n&&(this._requiresUpperAndLowerCaseCharacters=n,this.raisePropertyChanged("requiresUpperAndLowerCaseCharacters"))},get_RequiresUpperAndLowerCaseCharacters:function(){return Sys.Extended.Deprecated("get_RequiresUpperAndLowerCaseCharacters()","get_requiresUpperAndLowerCaseCharacters()"),this.get_requiresUpperAndLowerCaseCharacters()},set_RequiresUpperAndLowerCaseCharacters:function(n){Sys.Extended.Deprecated("set_RequiresUpperAndLowerCaseCharacters(value)","set_requiresUpperAndLowerCaseCharacters(value)");this.set_requiresUpperAndLowerCaseCharacters(n)},get_textCssClass:function(){return this._txtPwdStrengthCssClass},set_textCssClass:function(n){this._txtPwdStrengthCssClass!=n&&(this._txtPwdStrengthCssClass=n,this.raisePropertyChanged("textCssClass"))},get_TextCssClass:function(){return Sys.Extended.Deprecated("get_TextCssClass()","get_textCssClass()"),this.get_textCssClass()},set_TextCssClass:function(n){Sys.Extended.Deprecated("set_TextCssClass(value)","set_textCssClass(value)");this.set_textCssClass(n)},get_barBorderCssClass:function(){return this._barBorderCssClass},set_barBorderCssClass:function(n){this._barBorderCssClass!=n&&(this._barBorderCssClass=n,this.raisePropertyChanged("barBorderCssClass"))},get_BarBorderCssClass:function(){return Sys.Extended.Deprecated("get_BarBorderCssClass()","get_barBorderCssClass()"),this.get_barBorderCssClass()},set_BarBorderCssClass:function(n){Sys.Extended.Deprecated("set_BarBorderCssClass(value)","set_barBorderCssClass(value)");this.set_barBorderCssClass(n)},get_barIndicatorCssClass:function(){return this._barIndicatorCssClass},set_barIndicatorCssClass:function(n){this._barIndicatorCssClass!=n&&(this._barIndicatorCssClass=n,this.raisePropertyChanged("barIndicatorCssClass"))},get_BarIndicatorCssClass:function(){return Sys.Extended.Deprecated("get_BarIndicatorCssClass()","get_barIndicatorCssClass()"),this.get_barIndicatorCssClass()},set_BarIndicatorCssClass:function(n){Sys.Extended.Deprecated("set_BarIndicatorCssClass(value)","set_barIndicatorCssClass(value)");this.set_barIndicatorCssClass(n)},get_displayPosition:function(){return this._displayPosition},set_displayPosition:function(n){this._displayPosition!=n&&(this._displayPosition=n,this.raisePropertyChanged("displayPosition"))},get_DisplayPosition:function(){return Sys.Extended.Deprecated("get_DisplayPosition()","get_displayPosition()"),this.get_displayPosition()},set_DisplayPosition:function(n){Sys.Extended.Deprecated("set_DisplayPosition(value)","set_displayPosition(value)");this.set_displayPosition(n)},get_prefixText:function(){return this._prefixText},set_prefixText:function(n){this._prefixText!=n&&(this._prefixText=n,this.raisePropertyChanged("prefixText"))},get_PrefixText:function(){return Sys.Extended.Deprecated("get_PrefixText()","get_prefixText()"),this.get_prefixText()},set_PrefixText:function(n){Sys.Extended.Deprecated("set_PrefixText(value)","set_prefixText(value)");this.set_prefixText(n)},get_strengthIndicatorType:function(){return this._strengthIndicator},set_strengthIndicatorType:function(n){this._strengthIndicator!=n&&(this._strengthIndicator=n,this.raisePropertyChanged("strengthIndicatorType"))},get_StrengthIndicatorType:function(){return Sys.Extended.Deprecated("get_StrengthIndicatorType()","get_strengthIndicatorType()"),this.get_strengthIndicatorType()},set_StrengthIndicatorType:function(n){Sys.Extended.Deprecated("set_StrengthIndicatorType(value)","set_strengthIndicatorType(value)");this.set_strengthIndicatorType(n)},get_textStrengthDescriptions:function(){return this._txtStrengthDescriptions},set_textStrengthDescriptions:function(n){n!=null&&n!=""&&n!=this._txtStrengthDescriptions&&(this._txtStrengthDescriptions=n,this.raisePropertyChanged("textStrengthDescriptions"))},get_TextStrengthDescriptions:function(){return Sys.Extended.Deprecated("get_TextStrengthDescriptions()","get_textStrengthDescriptions()"),this.get_textStrengthDescriptions()},set_TextStrengthDescriptions:function(n){Sys.Extended.Deprecated("set_TextStrengthDescriptions(value)","set_textStrengthDescriptions(value)");this.set_textStrengthDescriptions(n)},get_strengthStyles:function(){return this._strengthStyles},set_strengthStyles:function(n){n!=null&&n!=""&&n!=this._strengthStyles&&(this._strengthStyles=n,this.raisePropertyChanged("strengthStyles"))},get_StrengthStyles:function(){return Sys.Extended.Deprecated("get_StrengthStyles()","get_strengthStyles()"),this.get_strengthStyles()},set_StrengthStyles:function(n){Sys.Extended.Deprecated("set_StrengthStyles(value)","set_strengthStyles(value)");this.set_strengthStyles(n)},get_TextStrengthDescriptionStyles:function(){return Sys.Extended.Deprecated("get_TextStrengthDescriptionStyles()","get_strengthStyles()"),this.get_strengthStyles()},set_TextStrengthDescriptionStyles:function(n){Sys.Extended.Deprecated("set_TextStrengthDescriptionStyles(value)","set_strengthStyles(value)");this.set_strengthStyles(n)},get_helpHandleCssClass:function(){return this._helpHandleCssClass},set_helpHandleCssClass:function(n){this._helpHandleCssClass!=n&&(this._helpHandleCssClass=n,this.raisePropertyChanged("helpHandleCssClass"))},get_HelpHandleCssClass:function(){return Sys.Extended.Deprecated("get_HelpHandleCssClass()","get_helpHandleCssClass()"),this.get_helpHandleCssClass()},set_HelpHandleCssClass:function(n){Sys.Extended.Deprecated("set_HelpHandleCssClass(value)","set_helpHandleCssClass(value)");this.set_helpHandleCssClass(n)},get_helpHandlePosition:function(){return this._helpHandlePosition},set_helpHandlePosition:function(n){this._helpHandlePosition!=n&&(this._helpHandlePosition=n,this.raisePropertyChanged("helpHandlePosition"))},get_HelpHandlePosition:function(){return Sys.Extended.Deprecated("get_HelpHandlePosition()","get_helpHandlePosition()"),this.get_helpHandlePosition()},set_HelpHandlePosition:function(n){Sys.Extended.Deprecated("set_HelpHandlePosition(value)","set_helpHandlePosition(value)");this.set_helpHandlePosition(n)},get_calculationWeightings:function(){return this._calcWeightings},set_calculationWeightings:function(n){this._calcWeightings!=n&&(this._calcWeightings=n,this.raisePropertyChanged("calculationWeightings"))},get_CalculationWeightings:function(){return Sys.Extended.Deprecated("get_CalculationWeightings()","get_calculationWeightings()"),this.get_calculationWeightings()},set_CalculationWeightings:function(n){Sys.Extended.Deprecated("set_CalculationWeightings(value)","set_calculationWeightings(value)");this.set_calculationWeightings(n)},get_helpText:function(){return this._helpText},set_helpText:function(n){if(this._helpStatusLabelID){var t=$get(this._helpStatusLabelID);t&&(t.innerHTML=Sys.Extended.UI.TextBoxWrapper.get_Wrapper(this.get_element()).get_Value().length>0?n:"")}this._helpText!=n&&(this._helpText=n,this.raisePropertyChanged("helpText"))},get_HelpText:function(){return Sys.Extended.Deprecated("get_HelpText()","get_helpText()"),this.get_helpText()},set_HelpText:function(n){Sys.Extended.Deprecated("set_HelpText(value)","set_helpText(value)");this.set_helpText(n)},get_minimumLowerCaseCharacters:function(){return this._minLowerCaseChars},set_minimumLowerCaseCharacters:function(n){this._minLowerCaseChars=n},get_MinimumLowerCaseCharacters:function(){return Sys.Extended.Deprecated("get_MinimumLowerCaseCharacters()","get_minimumLowerCaseCharacters()"),this.get_minimumLowerCaseCharacters()},set_MinimumLowerCaseCharacters:function(n){Sys.Extended.Deprecated("set_MinimumLowerCaseCharacters(value)","set_minimumLowerCaseCharacters(value)");this.set_minimumLowerCaseCharacters(n)},get_minimumUpperCaseCharacters:function(){return this._minUpperCaseChars},set_minimumUpperCaseCharacters:function(n){this._minUpperCaseChars=n},get_MinimumUpperCaseCharacters:function(){return Sys.Extended.Deprecated("get_MinimumUpperCaseCharacters()","get_minimumUpperCaseCharacters()"),this.get_minimumUpperCaseCharacters()},set_MinimumUpperCaseCharacters:function(n){Sys.Extended.Deprecated("set_MinimumUpperCaseCharacters(value)","set_minimumUpperCaseCharacters(value)");this.set_minimumUpperCaseCharacters(n)},get_helpStatusLabelID:function(){return this._helpStatusLabelID},set_helpStatusLabelID:function(n){this._helpStatusLabelID!=n&&(this._helpStatusLabelID=n,this.raisePropertyChanged("helpStatusLabelID"))},get_HelpStatusLabelID:function(){return Sys.Extended.Deprecated("get_HelpStatusLabelID()","get_helpStatusLabelID()"),this.get_helpStatusLabelID()},set_HelpStatusLabelID:function(n){Sys.Extended.Deprecated("set_HelpStatusLabelID(value)","set_helpStatusLabelID(value)");this.set_helpStatusLabelID(n)}};Sys.Extended.UI.PasswordStrengthExtenderBehavior.registerClass("Sys.Extended.UI.PasswordStrengthExtenderBehavior",Sys.Extended.UI.BehaviorBase);Sys.Extended.UI.StrengthIndicatorTypes=function(){throw Error.invalidOperation();};Sys.Extended.UI.DisplayPosition=function(){throw Error.invalidOperation();};Sys.Extended.UI.StrengthIndicatorTypes.prototype={Text:0,BarIndicator:1};Sys.Extended.UI.DisplayPosition.prototype={RightSide:0,AboveRight:1,AboveLeft:2,LeftSide:3,BelowRight:4,BelowLeft:5};Sys.Extended.UI.DisplayPosition.registerEnum("Sys.Extended.UI.DisplayPosition");Sys.Extended.UI.StrengthIndicatorTypes.registerEnum("Sys.Extended.UI.StrengthIndicatorTypes");