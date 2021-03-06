import { browser, element, by, ElementFinder } from 'protractor';
let signinButton: ElementFinder = element.all(by.css('button[block]')).first();
let fFANumberTextBox: ElementFinder = element(by.css("input[name='fFANumber']"));
let passwordTextBox: ElementFinder = element(by.css("input[name='password']"));

describe('Player', () => {
    beforeEach(() => {
        browser.get('');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
        fFANumberTextBox.sendKeys('1234567890');
        passwordTextBox.sendKeys('test@123');
        expect(signinButton.getAttribute('disabled')).toBe(null);
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(7000); // wait for the animation           
    });

    it('should show player list and filter', () => {
        // Go to player list
        // let parentNavBar = element(by.css('ion-navbar'));
        // parentNavBar.element(by.css("button[menuToggle]")).click();
        // browser.driver.sleep(1000); // wait for the animation
        // let parent = element(by.css("ion-menu[class='show-menu']"));
        // let ionList = parent.element(by.css("ion-list"));
        // ionList.all(by.css("button[tappable]")).get(0).click();
        // browser.driver.sleep(5000); // wait for the animation

        // Player list
        expect(browser.getTitle()).toEqual('Players');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Players');
        expect(element(by.css('ion-searchbar')).isPresent()).toEqual(true);
        let parentSearchBar = element(by.css("ion-searchbar"));
        parentSearchBar.element(by.css("input[type='search']")).sendKeys('john');
        browser.driver.sleep(1000); // wait for the animation
        let parentContent = element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        expect(ionListContent.isPresent()).toEqual(true);
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);
        // redirect to player detail
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation     
    });

    it('Update player detail', () => {
        // Player list                
        expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Players');
        element(by.css("ion-searchbar"));
        let parentSearchBar = element(by.css("ion-searchbar"));
        parentSearchBar.element(by.css("input[type='search']")).sendKeys('Michael');
        browser.driver.sleep(2000); // wait for the animation
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);

        // Go to player detail
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation

        // Go to player edit
        element.all(by.className('item-button')).get(1).click();
        browser.driver.sleep(3000); // wait for the animation

        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);

        // Check all fields
        let playerEditPage = element(by.css("page-player-edit"));
        let fieldCount = 0;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('First Name');
        expect(element(by.id('givenName')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Last Name');
        expect(element(by.id('familyName')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('FFA Number');
        expect(element(by.id('fFANumber')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Date of Birth');
        expect(element(by.id('birthDate')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Age Group');
        expect(element(by.id('ageGroup')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Preferred Playing Position');
        expect(element(by.id('preferredPlayingPosition')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Gender');
        expect(element(by.id('gender')).isPresent()).toEqual(true);
        fieldCount++;
        expect(element(by.id('objectivesAmbitions')).isPresent()).toEqual(true);

        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Address');
        expect(element(by.id('residentialAddress')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Home Phone');
        expect(element(by.id('homeNumber')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Mobile');
        expect(element(by.id('mobileNumber')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('E-Mail');
        expect(element(by.id('email')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Name');
        expect(element(by.id('contact1_personName')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Relationship');
        expect(element(by.id('contact1_relationship')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Phone');
        expect(element(by.id('contact1_contactNumber')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('E-Mail');
        expect(element(by.id('contact1_email')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Name');
        expect(element(by.id('contact2_personName')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Relationship');
        expect(element(by.id('contact2_relationship')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Phone');
        expect(element(by.id('contact2_contactNumber')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('E-Mail');
        expect(element(by.id('contact2_email')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Details of School');
        expect(element(by.id('schoolDetails')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Details of Employment');
        expect(element(by.id('employementDetails')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Previous Club (2016)');
        expect(element(by.id('previousClub2016')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Previous Club (2015)');
        expect(element(by.id('previousClub2015')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Current Suspensions');
        expect(element(by.id('suspensionsDetails')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Injuries');
        expect(element(by.id('injuriesDetails')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Head Coach Name');
        expect(element(by.id('headCoachName')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Contact Phone & Email');
        expect(element(by.id('contactDetails')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('# Sessions per Week');
        expect(element(by.id('academicSessionPerWeekCount')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Arranged by');
        expect(element(by.id('arrangedBy')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Destination');
        expect(element(by.id('destination')).isPresent()).toEqual(true);
        fieldCount++;
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).isPresent()).toEqual(true);
        expect(playerEditPage.all(by.className('blue-label')).get(fieldCount).getText()).toEqual('Purpose of Trip');
        expect(element(by.id('purposeOfTrip')).isPresent()).toEqual(true);

        // Set values
        element.all(by.className("text-input")).clear();
        element(by.css("input[name='givenName']")).sendKeys("Michael");
        element(by.css("input[name='familyName']")).sendKeys("Clarke");
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

        element(by.css("textarea[name='objectivesAmbitions']")).sendKeys("my objectives and ambitions")
        element(by.css("input[name='residentialAddress']")).sendKeys("AUS")
        element(by.css("input[name='homeNumber']")).sendKeys("4541564564")
        element(by.css("input[name='mobileNumber']")).sendKeys("98987544498")
        element(by.css("input[name='email']")).sendKeys("Michael@gmail.com")

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

    it('Add a player to session or remove from session', () => {
        // Player list                        
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);

        // Go to player detail
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation

        // Go to session list to add player
        element.all(by.className('item-button')).get(0).click();
        browser.driver.sleep(3000); // wait for the animation        

        let sessionPopup = element(by.css("page-session-list-popup"));

        expect(sessionPopup.element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(sessionPopup.element(by.css('ion-navbar:first-child')).getText()).toContain('Sessions');
        let parentContent = sessionPopup.element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        expect(ionListContent.isPresent()).toEqual(true);
        let sessionItem = ionListContent.all(by.css("ion-item[tappable]")).first();
        expect(sessionItem.isPresent()).toEqual(true);

        // Tap a session item
        sessionItem.click();
        browser.driver.sleep(2000); // wait for the animation

        // Save changes
        sessionPopup.all(by.className('bar-button')).get(2).click();
        browser.driver.sleep(2000); // wait for the animation

        // Go to session list popup
        element.all(by.className('item-button')).get(0).click();
        browser.driver.sleep(2000); // wait for the animation

        // Click back button of session list popup
        sessionPopup.all(by.className('bar-button')).get(1).click();
        browser.driver.sleep(2000); // wait for the animation
    });
});