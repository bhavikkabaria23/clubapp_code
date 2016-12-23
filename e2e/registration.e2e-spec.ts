import { browser, element, by, ElementFinder } from 'protractor';
let signinButton: ElementFinder = element.all(by.css('button[block]')).first();
let fFANumberTextBox: ElementFinder = element(by.css("input[name='fFANumber']"));
let passwordTextBox: ElementFinder = element(by.css("input[name='password']"));

describe('Registration', () => {
    beforeEach(() => {
        browser.get('');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
        fFANumberTextBox.sendKeys('1234567890');
        passwordTextBox.sendKeys('test@123');
        expect(signinButton.getAttribute('disabled')).toBe(null);
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(7000); // wait for the animation           
    });

    it('should show registration list and filter', () => {
        // Go to registration list
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(0).click();
        browser.driver.sleep(5000); // wait for the animation

        expect(browser.getTitle()).toEqual('Registrations');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Registrations');
        expect(element(by.css('ion-searchbar')).isPresent()).toEqual(true);
        let parentSearchBar = element(by.css("ion-searchbar"));
        parentSearchBar.element(by.css("input[type='search']")).sendKeys('ronak');
        browser.driver.sleep(1000); // wait for the animation
        let parentContent = element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        expect(ionListContent.isPresent()).toEqual(true);
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation 

        //let back = element(by.css('.back-button'));
        //element.all(by.css('.back-button')).first().click();

        // let mumbaiCity = element.all(by.id('.back-button')).filter((elm) => {
        //     return elm.isDisplayed().then(function (isDisplayed) {
        //         return isDisplayed;
        //     });
        // }).first();
        // mumbaiCity.click();
    });

    it('should updates a registration', () => {
        // Go to registration list
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menutoggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(0).click();
        browser.driver.sleep(5000); // wait for the animation

        // Select an item from list and click to go to edit registration
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        ionItem.click();
        browser.driver.sleep(7000); // wait for the animation

        // Update registration
        // Check Nav bar with title
        expect(browser.getTitle()).toEqual('Gladesville Ryde Magic FC');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);

        // Check field labels and inputs      

        expect(element.all(by.className('blue-label')).get(0).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(0).getText()).toEqual('Player ID');

        expect(element.all(by.className('blue-label')).get(1).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(1).getText()).toEqual('Player Name');
        expect(element(by.id('playerName')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(2).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(2).getText()).toEqual('FFA Number');
        expect(element(by.id('fFANumber')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(3).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(3).getText()).toEqual('Date of Birth');
        expect(element(by.id('birthDate')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(4).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(4).getText()).toEqual('Age Group');
        expect(element(by.id('ageGroup')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(5).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(5).getText()).toEqual('Preferred Playing Position');
        expect(element(by.id('preferredPlayingPosition')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(6).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(6).getText()).toEqual('Gender');
        expect(element(by.id('gender')).isPresent()).toEqual(true);

        expect(element(by.id('objectivesAmbitions')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(7).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(7).getText()).toEqual('Address');
        expect(element(by.id('residentialAddress')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(8).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(8).getText()).toEqual('Home Phone');
        expect(element(by.id('homeNumber')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(9).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(9).getText()).toEqual('Mobile');
        expect(element(by.id('mobileNumber')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(10).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(10).getText()).toEqual('E-Mail');
        expect(element(by.id('email')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(11).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(11).getText()).toEqual('Name');
        expect(element(by.id('contact1_personName')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(12).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(12).getText()).toEqual('Relationship');
        expect(element(by.id('contact1_relationship')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(13).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(13).getText()).toEqual('Phone');
        expect(element(by.id('contact1_contactNumber')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(14).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(14).getText()).toEqual('E-Mail');
        expect(element(by.id('contact1_email')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(15).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(15).getText()).toEqual('Name');
        expect(element(by.id('contact2_personName')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(16).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(16).getText()).toEqual('Relationship');
        expect(element(by.id('contact2_relationship')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(17).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(17).getText()).toEqual('Phone');
        expect(element(by.id('contact2_contactNumber')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(18).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(18).getText()).toEqual('E-Mail');
        expect(element(by.id('contact2_email')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(19).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(19).getText()).toEqual('Details of School');
        expect(element(by.id('schoolDetails')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(20).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(20).getText()).toEqual('Details of Employment');
        expect(element(by.id('employementDetails')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(21).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(21).getText()).toEqual('Previous Club (2016)');
        expect(element(by.id('previousClub2016')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(22).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(22).getText()).toEqual('Previous Club (2015)');
        expect(element(by.id('previousClub2015')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(23).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(23).getText()).toEqual('Current Suspensions');
        expect(element(by.id('suspensionsDetails')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(24).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(24).getText()).toEqual('Injuries');
        expect(element(by.id('injuriesDetails')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(25).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(25).getText()).toEqual('Head Coach Name');
        expect(element(by.id('headCoachName')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(26).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(26).getText()).toEqual('Contact Phone & Email');
        expect(element(by.id('contactDetails')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(27).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(27).getText()).toEqual('# Sessions per Week');
        expect(element(by.id('academicSessionPerWeekCount')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(28).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(28).getText()).toEqual('Arranged by');
        expect(element(by.id('arrangedBy')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(29).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(29).getText()).toEqual('Destination');
        expect(element(by.id('destination')).isPresent()).toEqual(true);

        expect(element.all(by.className('blue-label')).get(30).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(30).getText()).toEqual('Purpose of Trip');
        expect(element(by.id('purposeOfTrip')).isPresent()).toEqual(true);

        // Set values        
        element.all(by.className("text-input")).clear();
        element(by.css("input[name='playerName']")).sendKeys("Shoun Marsh");
        element(by.css("input[name='fFANumber']")).sendKeys("121212")
        element(by.css("ion-datetime[name='birthDate']")).click();
        browser.driver.sleep(2000); // wait for the animation
        element(by.css("div[class='picker-toolbar-button']:nth-child(2) button")).click();

        element(by.css("ion-select[name='preferredPlayingPosition']")).click();
        browser.driver.sleep(1000); // wait for the animation
        element.all(by.css("div[class='alert-radio-label']")).get(0).click();
        browser.driver.sleep(1000); // wait for the animation
        element(by.css("div[class='alert-button-group'] button:nth-child(2)")).click();
        browser.driver.sleep(1000); // wait for the animation
        element(by.css("ion-select[name='gender']")).click();
        browser.driver.sleep(1000); // wait for the animation
        element.all(by.css("div[class='alert-radio-label']")).get(0).click();
        browser.driver.sleep(1000); // wait for the animation
        element(by.css("div[class='alert-button-group'] button:nth-child(2)")).click();

        // element(by.css("ion-select[name='preferredPlayingPosition']")).sendKeys("1")
        // element(by.css("ion-select[name='gender']")).sendKeys("male")
        element(by.css("textarea[name='objectivesAmbitions']")).sendKeys("my objectives and ambitions")
        element(by.css("input[name='residentialAddress']")).sendKeys("AUS")
        element(by.css("input[name='homeNumber']")).sendKeys("4541564564")
        element(by.css("input[name='mobileNumber']")).sendKeys("98987544498")
        element(by.css("input[name='email']")).sendKeys("shoun@gmail.com")

        element(by.css("input[name='contact1_personName']")).sendKeys("xyz")
        element(by.css("input[name='contact1_relationship']")).sendKeys("father")
        element(by.css("input[name='contact1_contactNumber']")).sendKeys("56458454")
        element(by.css("input[name='contact1_email']")).sendKeys("xyz@gmail.com")
        element(by.css("input[name='contact2_personName']")).sendKeys("abc")
        element(by.css("input[name='contact2_relationship']")).sendKeys("brother")
        element(by.css("input[name='contact2_contactNumber']")).sendKeys("4657984564")
        element(by.css("input[name='contact2_email']")).sendKeys("abc@gmail.com")

        element(by.css("textarea[name='schoolDetails']")).sendKeys("school details")
        element(by.css("textarea[name='employementDetails']")).sendKeys("employee details")

        element(by.css("input[name='previousClub2016']")).sendKeys("2016 club details")
        element(by.css("input[name='previousClub2015']")).sendKeys("2015 club details")
        element(by.css("textarea[name='suspensionsDetails']")).sendKeys("not yet suspension")
        element(by.css("textarea[name='injuriesDetails']")).sendKeys("not yet any injusry")

        element(by.css("input[name='headCoachName']")).sendKeys("coach name")
        element(by.css("input[name='contactDetails']")).sendKeys("4544564")
        element(by.css("input[name='academicSessionPerWeekCount']")).sendKeys("1")
        element(by.css("input[name='arrangedBy']")).sendKeys("sports head")
        element(by.css("textarea[name='purposeOfTrip']")).sendKeys("training")
        element(by.css("input[name='destination']")).sendKeys("Sydney")

        // Call submit
        browser.driver.sleep(2000); // wait for the animation
        element.all(by.css("button[type='submit']")).first().click();
        browser.driver.sleep(5000); // wait for the animation    
    });

    it('should convert a registration to players', () => {
        // Go to registration list
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(0).click();
        browser.driver.sleep(5000); // wait for the animation

        // Select an item from list and click to go to edit registration
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        ionItem.click();
        browser.driver.sleep(7000); // wait for the animation

        // Set values        
        element.all(by.className("text-input")).clear();
        element(by.css("input[name='playerName']")).sendKeys("Shane Warne");
        element(by.css("input[name='fFANumber']")).sendKeys("121212")
        element(by.css("ion-datetime[name='birthDate']")).click();
        browser.driver.sleep(2000); // wait for the animation
        element(by.css("div[class='picker-toolbar-button']:nth-child(2) button")).click();

        element(by.css("ion-select[name='preferredPlayingPosition']")).click();
        browser.driver.sleep(1000); // wait for the animation
        element.all(by.css("div[class='alert-radio-label']")).get(0).click();
        browser.driver.sleep(1000); // wait for the animation
        element(by.css("div[class='alert-button-group'] button:nth-child(2)")).click();
        browser.driver.sleep(1000); // wait for the animation
        element(by.css("ion-select[name='gender']")).click();
        browser.driver.sleep(1000); // wait for the animation
        element.all(by.css("div[class='alert-radio-label']")).get(0).click();
        browser.driver.sleep(1000); // wait for the animation
        element(by.css("div[class='alert-button-group'] button:nth-child(2)")).click();

        // element(by.css("ion-select[name='preferredPlayingPosition']")).sendKeys("1")
        // element(by.css("ion-select[name='gender']")).sendKeys("male")
        element(by.css("textarea[name='objectivesAmbitions']")).sendKeys("my objectives and ambitions")
        element(by.css("input[name='residentialAddress']")).sendKeys("AUS")
        element(by.css("input[name='homeNumber']")).sendKeys("4541564564")
        element(by.css("input[name='mobileNumber']")).sendKeys("98987544498")
        element(by.css("input[name='email']")).sendKeys("shane@gmail.com")

        element(by.css("input[name='contact1_personName']")).sendKeys("xyz")
        element(by.css("input[name='contact1_relationship']")).sendKeys("father")
        element(by.css("input[name='contact1_contactNumber']")).sendKeys("56458454")
        element(by.css("input[name='contact1_email']")).sendKeys("xyz@gmail.com")
        element(by.css("input[name='contact2_personName']")).sendKeys("abc")
        element(by.css("input[name='contact2_relationship']")).sendKeys("brother")
        element(by.css("input[name='contact2_contactNumber']")).sendKeys("4657984564")
        element(by.css("input[name='contact2_email']")).sendKeys("abc@gmail.com")

        element(by.css("textarea[name='schoolDetails']")).sendKeys("school details")
        element(by.css("textarea[name='employementDetails']")).sendKeys("employee details")

        element(by.css("input[name='previousClub2016']")).sendKeys("2016 club details")
        element(by.css("input[name='previousClub2015']")).sendKeys("2015 club details")
        element(by.css("textarea[name='suspensionsDetails']")).sendKeys("not yet suspension")
        element(by.css("textarea[name='injuriesDetails']")).sendKeys("not yet any injusry")

        element(by.css("input[name='headCoachName']")).sendKeys("coach name")
        element(by.css("input[name='contactDetails']")).sendKeys("4544564")
        element(by.css("input[name='academicSessionPerWeekCount']")).sendKeys("1")
        element(by.css("input[name='arrangedBy']")).sendKeys("sports head")
        element(by.css("textarea[name='purposeOfTrip']")).sendKeys("training")
        element(by.css("input[name='destination']")).sendKeys("Sydney")

        // Convert to player
        browser.driver.sleep(2000); // wait for the animation
        element.all(by.css("button[type='submit']")).get(1).click();
        browser.driver.sleep(5000); // wait for the animation                           
    });
}); 
