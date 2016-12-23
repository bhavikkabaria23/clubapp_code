import { browser, element, by, ElementFinder, protractor } from 'protractor';
let signinButton: ElementFinder = element.all(by.css('button[block]')).first();
let fFANumberTextBox: ElementFinder = element(by.css("input[name='fFANumber']"));
let passwordTextBox: ElementFinder = element(by.css("input[name='password']"));

describe('Sessions', () => {
    beforeEach(() => {
        // browser.manage().window().maximize();
        browser.get('');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
        fFANumberTextBox.sendKeys('1234567890');
        passwordTextBox.sendKeys('test@123');
        expect(signinButton.getAttribute('disabled')).toBe(null);
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(7000); // wait for the animation
    });
    it('should show session list and filter', () => {
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(3).click();
        browser.driver.sleep(3000); // wait for the animation           
        expect(browser.getTitle()).toEqual('Sessions');
        expect(element(by.css("ion-navbar ion-buttons")).isPresent()).toEqual(true);
        expect(element(by.css('ion-searchbar')).isPresent()).toEqual(true);

        let parentSearchBar = element(by.css("ion-searchbar"));
        parentSearchBar.element(by.css("input[type='search']")).sendKeys('201610231800U009');
        browser.driver.sleep(1000); // wait for the animation
        let parentContent = element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        expect(ionListContent.isPresent()).toEqual(true);
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);

        // redirect to Session detail
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation     
    });

    it('should Create new Session', () => {
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(3).click();
        browser.driver.sleep(3000); // wait for the animation           
        expect(browser.getTitle()).toEqual('Sessions');
        expect(element(by.css("ion-navbar ion-buttons")).isPresent()).toEqual(true);
        element(by.css("ion-navbar ion-buttons")).click();
        browser.driver.sleep(3000); // wait for the animation     
        expect(browser.getTitle()).toEqual('Create Session');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(0).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(1).isPresent()).toEqual(true);
        expect(element.all(by.className('blue-label')).get(0).getText()).toEqual('Session');
        expect(element.all(by.className('blue-label')).get(1).getText()).toEqual('Start Date & Time');
        expect(element(by.id('sessionKey')).isPresent()).toEqual(true);
        expect(element(by.id('startDateTime')).isPresent()).toEqual(true);
        element(by.css("input[name='sessionKey']")).sendKeys("201612251800U009");
        element(by.css("ion-datetime[name='startDateTime']")).click();
        browser.driver.sleep(2000); // wait for the animation
        element(by.css("div[class='picker-toolbar-button']:nth-child(2) button")).click();
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(7000); // wait for the animation    
    });

    it('should go to session detail', () => {
        let parentNavBar = element(by.css('ion-navbar'));
        parentNavBar.element(by.css("button[menuToggle]")).click();
        browser.driver.sleep(1000); // wait for the animation
        let parent = element(by.css("ion-menu[class='show-menu']"));
        let ionList = parent.element(by.css("ion-list"));
        ionList.all(by.css("button[tappable]")).get(3).click();
        browser.driver.sleep(3000); // wait for the animation                                           
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);
        // redirect to Session detail
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation

        // Refresh button
        let sessionDetailPage = element(by.css("page-session-detail"));
        expect(sessionDetailPage.element(by.css("ion-navbar ion-buttons")).isPresent()).toEqual(true);
        expect(sessionDetailPage.all(by.css('ion-navbar button')).get(1).getText()).toEqual('REFRESH');
        sessionDetailPage.element(by.css("button:nth-child(1)")).click();
        browser.driver.sleep(2000); // wait for the animation

        // Divider elements
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(0).isPresent()).toEqual(true);
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(0).element(by.css("ion-label")).getText()).toEqual('Coaches');

        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(1).isPresent()).toEqual(true);
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(1).element(by.css("ion-label")).getText()).toEqual('Skills');

        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(2).isPresent()).toEqual(true);
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(2).element(by.css("ion-label")).getText()).toEqual('Players');

        // Add coach to session / remove coach from session
        sessionDetailPage.all(by.css("ion-item-divider")).get(0).element(by.css('button')).click();
        browser.driver.sleep(2000); // wait for the animation
        let coachListPage = element(by.css("page-coach"));
        let coachItem = coachListPage.all(by.css("ion-item[tappable]")).get(0);
        coachItem.click();
        browser.driver.sleep(1000); // wait for the animation
        coachItem = coachListPage.all(by.css("ion-item[tappable]")).get(1);
        coachItem.click();
        browser.driver.sleep(1000); // wait for the animation
        expect(coachListPage.all(by.css('ion-navbar button')).last().isPresent()).toEqual(true);
        expect(coachListPage.all(by.css('ion-navbar button')).last().getText()).toEqual('SAVE');
        coachListPage.all(by.css('ion-navbar button')).last().click();
        browser.driver.sleep(7000); // wait for the animation        

        // Add skills to session
        sessionDetailPage.all(by.css("ion-item-divider")).get(1).element(by.css('button')).click();
        browser.driver.sleep(2000); // wait for the animation
        let skillListPopup = element(by.css("skill-list-popup"));
        let skillItem = skillListPopup.all(by.css("ion-item[tappable]")).get(0);
        skillItem.click();
        browser.driver.sleep(1000); // wait for the animation
        skillItem = skillListPopup.all(by.css("ion-item[tappable]")).get(1);
        skillItem.click();
        browser.driver.sleep(1000); // wait for the animation
        skillItem = skillListPopup.all(by.css("ion-item[tappable]")).get(2);
        skillItem.click();
        browser.driver.sleep(1000); // wait for the animation
        expect(skillListPopup.all(by.css('ion-navbar button')).last().isPresent()).toEqual(true);
        expect(skillListPopup.all(by.css('ion-navbar button')).last().getText()).toEqual('SAVE');
        skillListPopup.all(by.css('ion-navbar button')).last().click();
        browser.driver.sleep(3000); // wait for the animation        

        // Remove a skill from session
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(1).element(by.xpath('following-sibling::ion-item')).isPresent()).toEqual(true);
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(1).element(by.xpath('following-sibling::ion-item')).element(by.css('button')).isPresent()).toEqual(true);
        sessionDetailPage.all(by.css("ion-item-divider")).get(1).element(by.xpath('following-sibling::ion-item')).element(by.css('button')).click();
        browser.driver.sleep(2000); // wait for the animation

        // Add player to session / remove player from session
        sessionDetailPage.all(by.css("ion-item-divider")).get(2).element(by.css('button')).click();
        browser.driver.sleep(2000); // wait for the animation
        let playerListPage = element(by.css("page-player-list"));
        let playerItem = playerListPage.all(by.css("ion-item[tappable]")).get(0);
        playerItem.click();
        browser.driver.sleep(1000); // wait for the animation
        playerItem = playerListPage.all(by.css("ion-item[tappable]")).get(1);
        playerItem.click();
        browser.driver.sleep(1000); // wait for the animation
        expect(playerListPage.all(by.css('ion-navbar button')).last().isPresent()).toEqual(true);
        expect(playerListPage.all(by.css('ion-navbar button')).last().getText()).toEqual('SAVE');
        playerListPage.all(by.css('ion-navbar button')).last().click();
        browser.driver.sleep(3000); // wait for the animation
    });
});
