
    
    var co = new Object;
    
    function recalc_onclick(ctl) {
    
        

        if (document.formc.automatic_recalc.checked || ctl=='') 
        {
            co.p1D1=eeparseFloat(document.formc.p1D1.value);
            co.p1D2=eeparseFloat(document.formc.p1D2.value);
            co.p1D3=eeparseFloatTh(document.formc.p1D3.value);
            co.p1D4=eeparseFloatV(document.formc.p1D4[document.formc.p1D4.selectedIndex].value);
            co.p1D7=eeparseFloat(document.formc.p1D7.value);
            calc(co);
            document.formc.p1D9.value=eedisplayFloatNDTh(co.p1D9,2);
            document.formc.p1D10.value=eedisplayFloatNDTh(co.p1D10,2);
        };
    };
    
    function LlogaritPension(p1,p2,p3,p4,p7){
            console.log("llogarit pension");
            co.p1D1=eeparseFloat(p1);
            co.p1D2=eeparseFloat(p2);
            co.p1D3=eeparseFloatTh(p3);
            co.p1D4=eeparseFloatV(p4);
            co.p1D7=eeparseFloat(p7);
            calc(co);
            
            var resp="";

            resp=eedisplayFloatNDTh(co.p1D9,2) + "#" + eedisplayFloatNDTh(co.p1D10,2);

            return resp;

    }    
    
    

    var eeisus=1;
    var eetrue="TRUE";
    var eefalse="FALSE";
    var eedec=".";
    var eeth=",";
    var eedecreg=new RegExp("[.]","g");
    var eethreg=new RegExp(",","g");
    
    
    function calc(data){
        var c1D1=data.p1D1;
        var c1D2=data.p1D2;
        var c1D3=data.p1D3;
        var c1D4=data.p1D4;
        var c1D7=data.p1D7;
        var c2A1=(((c1D2)-(c1D1)));
        var c2A2=(Math.pow((((1)+(((v2n(c1D4))/(100))))),(((1)/(12)))));
        var c2A3=(((c1D3)*(0.97)));
        var c2A7=(((12)*(c1D7)));
        var c2C3=(((c2A3)*(c2A2)));
        var c2C4=(((Math.pow((c2A2),(((12)*(c2A1)))))-(1)));
        var c2C7=(((Math.pow((c2A2),(c2A7)))-(1)));
        var c2C8=(((Math.pow((c2A2),(c2A7)))*(((c2A2)-(1)))));
        var c2A4=(((((c2C3)*(c2C4)))/(((c2A2)-(1)))));
        var c2C9=(((((c2A4)*(c2C8)))/(c2C7)));
        var c1D9=(c2A4);var c1D10=(c2C9);
        data.p1D9=c1D9;
        data.p1D10=c1D10;
    };
    
    
    function myIsNaN(x){
        return(isNaN(x)||(typeof x=='number'&&!isFinite(x)));
    };
    function round(n,nd){
        if(isFinite(n)&&isFinite(nd)){
            var sign_n=(n<0)?-1:1;
            var abs_n=Math.abs(n);
            var factor=Math.pow(10,nd);
            return sign_n*Math.round(abs_n*factor)/factor;}
        else{return NaN;}
    };
    function s2n(str){
        str=String(str).replace(eedecreg,".");return parseFloat(str);
    }
    function v2n(v){
        switch(typeof v){
            case "number":return v;
            case "string":return s2n(v);
            case "boolean":return v?1:0;
            case "object":
                            if(v.constructor==Number){return v;};
                            if(v.constructor==String){return s2n(v);};
                            if(v.constructor==Boolean){return v?1:0;};
                            return Number.NaN;
            default:return Number.NaN;}
    };
    function eeparseFloat(str){
        str=String(str).replace(eedecreg,".");
        var res=parseFloat(str);
        if(isNaN(res)){
            return 0;
        }else{
            return res;
        }
    };
    function eedisplayFloat(x){
        if(myIsNaN(x)){
            return Number.NaN;
        }else{
            return String(x).replace(/\./g,eedec);
        }
    };
    function eeparseFloatTh(str){
        str=String(str).replace(eethreg,"");
        str=String(str).replace(eedecreg,".");
        var res=parseFloat(str);
        if(isNaN(res)){
            return 0;
        }else{return res;}
    };
    function eedisplayFloatNDTh(x,nd){
        if(myIsNaN(x)){
            return Number.NaN;
        }else{
            var res=round(x,nd);
            if(nd>0){
                var str=String(res);
                if(str.indexOf('e')!=-1)                return str;
                if(str.indexOf('E')!=-1)                return str;
                var parts=str.split('.');
                var res2=eeinsertThousand(parts[0].toString());
                if(parts.length<2){
                    var decimals=('00000000000000').substring(0,nd);
                    return(res2+eedec+decimals);
                }else{
                    var decimals=((parts[1]).toString()+'00000000000000').substring(0,nd);
                    return(res2+eedec+decimals);}
                }else{return(eeinsertThousand(res.toString()));
                }
            }
        };
        var eeparseFloatVreg=new RegExp("^ *-?[0-9.]+ *$");
        
        function eeparseFloatV(str){
            if(str=="")return str;
            str=String(str).replace(eedecreg,".");
            if(!eeparseFloatVreg.test(str)){
                return str;
            };
            var res=parseFloat(str);
            if(isNaN(res)){
                return str;}
                else{return res;}
        };
        
        function eeinsertThousand(whole){
            if(whole==""||whole.indexOf("e")>=0)
            {return whole;}
            else{
                var minus_sign="";
                if(whole.charAt(0)=="-"){
                    minus_sign="-";
                    whole=whole.substring(1);
                };
                var res="";
                var str_length=whole.length-1;
                for(var ii=0;ii<=str_length;ii++){
                    if(ii>0&&ii%3==0){
                        res=eeth+res;
                    };
                    res=whole.charAt(str_length-ii)+res;
                };return minus_sign+res;
            }
        };