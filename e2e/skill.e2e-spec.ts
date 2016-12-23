import { browser, element, by, ElementFinder, protractor } from 'protractor';
let signinButton: ElementFinder = element.all(by.css('button[block]')).first();
let fFANumberTextBox: ElementFinder = element(by.css("input[name='fFANumber']"));
let passwordTextBox: ElementFinder = element(by.css("input[name='password']"));

describe('Skills', () => {
    beforeEach(() => {
        // browser.manage().window().maximize();
        browser.get('');
        fFANumberTextBox.sendKeys('1234567890');
        passwordTextBox.sendKeys('test@123');
        expect(signinButton.getAttribute('disabled')).toBe(null);
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(7000); // wait for the animation
    });

    it('should filters a skill', () => {
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(7).click();
        browser.driver.sleep(3000); // wait for the animation   
        expect(browser.getTitle()).toEqual('Skills');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Skills');
        expect(element(by.css('ion-searchbar')).isPresent()).toEqual(true);
        let parentSearchBar = element(by.css("ion-searchbar"));
        parentSearchBar.element(by.css("input[type='search']")).sendKeys('test');
        browser.driver.sleep(1000); // wait for the animation
        let parentContent = element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        expect(ionListContent.isPresent()).toEqual(true);
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);
        ionItem.click();
        browser.driver.sleep(4000); // wait for the animation 
        // expect(element(by.className('back-button')).isPresent()).toEqual(true);
        // element(by.className('back-button')).click();
    });

      it('should update existing Skill', () => {
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(7).click();
        browser.driver.sleep(3000); // wait for the animation   
        let parentContent = element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        ionItem.click();
        browser.driver.sleep(7000); // wait for the animation 
        expect(browser.getTitle()).toEqual('Edit Skill');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(0).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(1).isPresent()).toEqual(true);        
        expect(element.all(by.className('blue-label')).get(0).getText()).toEqual('Name');
        expect(element.all(by.className('blue-label')).get(1).getText()).toEqual('Instructions');        
        expect(element(by.id('name')).isPresent()).toEqual(true);
        expect(element(by.id('instructions')).isPresent()).toEqual(true);       
        element.all(by.className("text-input")).clear();        
        element(by.css("input[name='name']")).sendKeys("Keeping");
        element(by.css("input[name='instructions']")).sendKeys("keepingi nstructions");       
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(5000); // wait for the animation    
      });

    it('should Create new Skill', () => {
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(7).click();
        browser.driver.sleep(3000); // wait for the animation           
        expect(browser.getTitle()).toEqual('Skills');
        expect(element(by.css("ion-navbar ion-buttons")).isPresent()).toEqual(true);
        element(by.css("ion-navbar ion-buttons")).click();
        browser.driver.sleep(3000); // wait for the animation     
        expect(browser.getTitle()).toEqual('Add New Skill');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(0).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(1).isPresent()).toEqual(true);        
        expect(element.all(by.className('blue-label')).get(0).getText()).toEqual('Name');
        expect(element.all(by.className('blue-label')).get(1).getText()).toEqual('Instructions');
        expect(element(by.id('name')).isPresent()).toEqual(true);
        expect(element(by.id('instructions')).isPresent()).toEqual(true);      
        element(by.css("input[name='name']")).sendKeys("Keeping");
        element(by.css("input[name='instructions']")).sendKeys("keepingi nstructions");        
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(7000); // wait for the animation    
    });
});
