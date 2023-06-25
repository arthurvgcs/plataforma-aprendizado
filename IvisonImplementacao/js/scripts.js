class Validator{

    constructor(){
        this.validations = [
            'required-Select',
            'required-Checkbox',
            'data-required',
            'data-min-length',
        ]
    }

    validate(form){
        
        //Resgatará as validações e  limpará

        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        let inputs = form.getElementsByTagName('input');
        let selects = form.getElementsByTagName('Select');
        let inputsArray = [...inputs, ...selects];
    
        inputsArray.forEach(function(input){
            if (input.getAttribute('required-heckbox') !== null) {
                this['requiredCheckbox'](input);
            }

            for(let i = 0 ; this.validations.length > i ; i++){
                if(input.getAttribute(this.validations[i])!=null){
                    
                    if(input.getAttribute(this.validations[i])!=null){
                    
                        let method = this.validations[i].replace('data-', '').replace('-', '');
                        
                        let value = input.getAttribute(this.validations[i]);
    
                        this[method](input,value);
                    }

                }
            }

        } ,this);
    }

    minlength(input, minValue) {
        
        let inputLength = input.value.length;

        let errorMessage = `Mínimo de ${minValue} caracteres`;

        if(inputLength < minValue){
           this.printMessage(input, errorMessage);
        }

    }

    printMessage(input, msg){

        let errorsQtd = input.parentNode.querySelector('.error-validation');
         
        if(errorsQtd === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            
            template.textContent = msg ;

            let inputParent = input.parentNode;
    
            template.classList.remove('template');

            if (input.type === 'checkbox') {
                template.classList.add('checkbox-error');
            }

            inputParent.appendChild(template);
        }
    }

    required(input){
        let inputValue = input.value;

        if(inputValue === '') {
            let errorMessage = 'Campo obrigatório';

            this.printMessage(input,errorMessage);

        }

    }

    requiredCheckbox(checkbox) {
        if (!checkbox.checked) {
          let errorMessage = 'Selecione a opção';
      
          this.printMessage(checkbox, errorMessage);
        }
      }
      

    //Aqui irá fazer a limpeza das validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener('click',function(e){
    
    e.preventDefault();
    
    validator.validate(form);

})