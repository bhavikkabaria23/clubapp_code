import { browser, element, by, ElementFinder, protractor } from 'protractor';
let signinButton: ElementFinder = element.all(by.css('button[block]')).first();
let fFANumberTextBox: ElementFinder = element(by.css("input[name='fFANumber']"));
let passwordTextBox: ElementFinder = element(by.css("input[name='password']"));

describe('Coach Session', () => {
    beforeEach(() => {
        browser.manage().window().maximize();
        browser.get('');
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
        //Sign in as a coach
        fFANumberTextBox.sendKeys('333333');
        passwordTextBox.sendKeys('test@123');
        expect(signinButton.getAttribute('disabled')).toBe(null);
        element.all(by.css("button[type='submit']")).first().submit();
        browser.driver.sleep(7000); // wait for the animation
    });

    it('should show assessment sessions list', () => {
        expect(browser.getTitle()).toEqual('Sessions');
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Sessions');

        // Refresh button
        let sessionListPage = element(by.css("assessment-session-list"));
        expect(sessionListPage.element(by.css("ion-navbar ion-buttons")).isPresent()).toEqual(true);
        expect(sessionListPage.element(by.css('button:nth-child(1)')).getText()).toEqual('REFRESH');
        sessionListPage.element(by.css("button:nth-child(1)")).click();
        browser.driver.sleep(2000); // wait for the animation

        // Session list
        let parentContent = element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        expect(ionListContent.isPresent()).toEqual(true);
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        expect(ionItem.isPresent()).toEqual(true);
        // redirect to session detail
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation     
    });

    it('should go to assessment session detail', () => {
        let ionItem = element.all(by.css("ion-item[tappable]")).first();
        // redirect to session detail
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation

        let sessionDetailPage = element(by.css("page-session-detail"));
        // Divider elements
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(0).isPresent()).toEqual(true);
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(0).element(by.css("ion-label")).getText()).toEqual('Players');

        // Refresh button        
        expect(sessionDetailPage.element(by.css("ion-navbar ion-buttons")).isPresent()).toEqual(true);
        expect(sessionDetailPage.element(by.css('button:nth-child(1)')).getText()).toEqual('REFRESH');
        sessionDetailPage.element(by.css("button:nth-child(1)")).click();
        browser.driver.sleep(2000); // wait for the animation

        // Player list should have at least one player and go to assessment page when clicked
        expect(sessionDetailPage.all(by.css("ion-item-divider")).get(0).element(by.xpath('following-sibling::ion-item')).isPresent()).toEqual(true);
        sessionDetailPage.all(by.css("ion-item-divider")).get(0).element(by.xpath('following-sibling::ion-item')).click();
        browser.driver.sleep(2000); // wait for the animation
    });

    it('should create assessment', () => {
        // Got to assessment create page
        let ionItem = element.all(by.css("ion-item[tappable]")).get(0);
        ionItem.click();
        browser.driver.sleep(3000); // wait for the animation0
        let sessionDetailPage = element(by.css("page-session-detail"));
        sessionDetailPage.all(by.css("ion-item-divider")).get(0).element(by.xpath('following-sibling::ion-item')).click();
        browser.driver.sleep(2000); // wait for the animation

        let assessmentCreatePage = element(by.css("page-assessment-create"));
        expect(browser.getTitle()).toEqual('Assessment');
        expect(assessmentCreatePage.element(by.css('ion-navbar')).isPresent()).toEqual(true);
        expect(assessmentCreatePage.element(by.css('ion-navbar:first-child')).getText()).toContain('Assessment');

        // Player detail
        let parentContent = assessmentCreatePage.element(by.css("ion-content"));
        let ionListContent = parentContent.element(by.css("ion-list"));
        expect(ionListContent.isPresent()).toEqual(true);
        let playerCard = ionListContent.all(by.css("ion-card")).get(0);
        expect(playerCard.isPresent()).toEqual(true);
        expect(playerCard.element(by.css('img')).isPresent()).toEqual(true);
        expect(playerCard.all(by.css('ion-label')).get(0).isPresent()).toEqual(true);
        expect(playerCard.all(by.css('ion-label')).get(1).isPresent()).toEqual(true);
        expect(playerCard.all(by.css('ion-label')).get(2).isPresent()).toEqual(true);
        expect(playerCard.all(by.css('ion-label')).get(3).isPresent()).toEqual(true);
        expect(playerCard.all(by.css('ion-label')).get(4).isPresent()).toEqual(true);

        // Player Position
        let playerPosition = ionListContent.element(by.css("ion-item"));
        expect(playerPosition.element(by.css('ion-label')).isPresent()).toEqual(true);
        expect(playerPosition.element(by.css('ion-label')).getText()).toEqual('Suggest Position');
        expect(playerPosition.element(by.css('ion-select')).isPresent()).toEqual(true);
        playerPosition.element(by.css("ion-select")).click();
        browser.driver.sleep(1000); // wait for the animation
        element.all(by.css("div[class='alert-radio-label']")).get(0).click();
        browser.driver.sleep(1000); // wait for the animation
        element(by.css("div[class='alert-button-group'] button:nth-child(2)")).click();
        browser.driver.sleep(1000); // wait for the animation

        ionListContent.all(by.css("ion-card ion-card-header")).count().then(function (cardCount) {
            if (cardCount > 0) {
                expect(cardCount).not.toBe(0);
                for (var i = 1; i <= cardCount; i++) {
                    let skillCard = ionListContent.all(by.css("ion-card")).get(i);
                    expect(skillCard.isPresent()).toEqual(true);
                    expect(skillCard.element(by.css('ion-card-header')).isPresent()).toEqual(true);
                    expect(skillCard.element(by.css("ion-card-header button")).isPresent()).toEqual(true);
                    expect(skillCard.element(by.css("ion-icon[name='ios-information-circle-outline']")).isPresent()).toEqual(true);                    
                    expect(skillCard.element(by.css('ion-card-content')).isPresent()).toEqual(true);

                    expect(skillCard.element(by.className('ratingBtn1')).isPresent()).toEqual(true);
                    expect(skillCard.element(by.className('ratingBtn2')).isPresent()).toEqual(true);
                    expect(skillCard.element(by.className('ratingBtn3')).isPresent()).toEqual(true);
                    expect(skillCard.element(by.className('ratingBtn4')).isPresent()).toEqual(true);
                    
                    skillCard.element(by.css("ion-card-header button")).click();
                    browser.driver.sleep(2000); // wait for the animation
                    browser.actions().sendKeys(protractor.Key.ESCAPE).perform();                    
                    browser.driver.sleep(1000); // wait for the animation

                    skillCard.element(by.className('ratingBtn3')).click();
                    browser.driver.sleep(1000); // wait for the animation
                }
            }
        });

        // Notes
        let noteCard = ionListContent.all(by.css("ion-card")).last();
        expect(noteCard.isPresent()).toEqual(true);
        expect(noteCard.element(by.css('ion-label')).isPresent()).toEqual(true);
        expect(noteCard.element(by.css('ion-textarea')).isPresent()).toEqual(true);
        noteCard.element(by.css("textarea")).clear();
        noteCard.element(by.css("textarea")).sendKeys("good player");

        // Save button        
        expect(assessmentCreatePage.element(by.css("ion-navbar ion-buttons")).isPresent()).toEqual(true);
        expect(assessmentCreatePage.element(by.css('button:nth-child(1)')).getText()).toEqual('SAVE');
        assessmentCreatePage.element(by.css('button:nth-child(1)')).click();
        browser.driver.sleep(2000); // wait for the animation
    });
});