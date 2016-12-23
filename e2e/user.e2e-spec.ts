import { browser, element, by, ElementFinder, protractor } from 'protractor';
let signinButton: ElementFinder = element.all(by.css('button[block]')).first();
let fFANumberTextBox: ElementFinder = element(by.css("input[name='fFANumber']"));
let passwordTextBox: ElementFinder = element(by.css("input[name='password']"));

describe('SignIn', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Sign In');
  });

  it('should have {nav}', () => {
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Sign in', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Sign In');
  });

  it('has an label for FFA Number', () => {
    expect(element.all(by.className('blue-label')).get(0).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(0).getText()).toEqual('FFA Number');
  });

  it('has an input box for new FFA Numbers', () => {
    expect(element(by.id('fFANumber')).isPresent()).toEqual(true);
  });

  it('has an label for Password', () => {
    expect(element.all(by.className('blue-label')).get(1).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(1).getText()).toEqual('Password');
  });

  it('has an input box for new Password', () => {
    expect(element(by.id('password')).isPresent()).toEqual(true);
  });

  it('should Sign in for Root', () => {
    fFANumberTextBox.sendKeys('1234567890');
    passwordTextBox.sendKeys('test@123');
    expect(signinButton.getAttribute('disabled')).toBe(null);
    signinButton.submit();
  });

  it('should Sign in for Administrator', () => {
    fFANumberTextBox.sendKeys('222222');
    passwordTextBox.sendKeys('test@123');
    expect(signinButton.getAttribute('disabled')).toBe(null);
    signinButton.submit();
  });

  it('should Sign in for Coach', () => {
    fFANumberTextBox.sendKeys('333333');
    passwordTextBox.sendKeys('test@123');
    expect(signinButton.getAttribute('disabled')).toBe(null);
    signinButton.submit();
  });

  it('should Sign in for Technical Director', () => {
    fFANumberTextBox.sendKeys('444444');
    passwordTextBox.sendKeys('test@123');
    expect(signinButton.getAttribute('disabled')).toBe(null);
    signinButton.submit();
  });

  it('should Sign in for Player', () => {
    fFANumberTextBox.sendKeys('565656');
    passwordTextBox.sendKeys('test@123');
    expect(signinButton.getAttribute('disabled')).toBe(null);
    signinButton.submit();
  });
});

describe('Users', () => {
  beforeEach(() => {
    // browser.manage().window().maximize();
    browser.get('');
    fFANumberTextBox.sendKeys('1234567890');
    passwordTextBox.sendKeys('test@123');
    expect(signinButton.getAttribute('disabled')).toBe(null);
    element.all(by.css("button[type='submit']")).first().submit();
    browser.driver.sleep(7000); // wait for the animation
  });

  it('should Filters a user', () => {
    let parentNavBar = element(by.css('ion-navbar'));
    parentNavBar.element(by.css("button[menuToggle]")).click();
    browser.driver.sleep(1000); // wait for the animation
    let parent = element(by.css("ion-menu[class='show-menu']"));
    let ionList = parent.element(by.css("ion-list"));
    ionList.all(by.css("button[tappable]")).get(5).click();
    browser.driver.sleep(3000); // wait for the animation   
    expect(browser.getTitle()).toEqual('Users');
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Users');
    expect(element(by.css('ion-searchbar')).isPresent()).toEqual(true);
    let parentSearchBar = element(by.css("ion-searchbar"));
    parentSearchBar.element(by.css("input[type='search']")).sendKeys('1234567890');
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
    // browser.driver.sleep(2000); // wait for the animation 
  });

  it('should update existing user', () => {
    let parentNavBar = element(by.css('ion-navbar'));
    parentNavBar.element(by.css("button[menuToggle]")).click();
    browser.driver.sleep(1000); // wait for the animation
    let parent = element(by.css("ion-menu[class='show-menu']"));
    let ionList = parent.element(by.css("ion-list"));
    ionList.all(by.css("button[tappable]")).get(5).click();
    browser.driver.sleep(3000); // wait for the animation   
    let parentContent = element(by.css("ion-content"));
    let ionListContent = parentContent.element(by.css("ion-list"));
    let ionItem = element.all(by.css("ion-item[tappable]")).first();
    ionItem.click();
    browser.driver.sleep(7000); // wait for the animation 
    expect(browser.getTitle()).toEqual('Edit User');
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(0).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(1).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(2).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(3).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(4).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(0).getText()).toEqual('Role');
    expect(element.all(by.className('blue-label')).get(1).getText()).toEqual('FFA Number');
    expect(element.all(by.className('blue-label')).get(2).getText()).toEqual('Password');
    expect(element.all(by.className('blue-label')).get(3).getText()).toEqual('Address');
    expect(element.all(by.className('blue-label')).get(4).getText()).toEqual('Mobile');
    expect(element(by.id('role')).isPresent()).toEqual(true);
    expect(element(by.id('fFANumber')).isPresent()).toEqual(true);
    expect(element(by.id('password')).isPresent()).toEqual(true);
    expect(element(by.id('address')).isPresent()).toEqual(true);
    expect(element(by.id('mobileNumber')).isPresent()).toEqual(true);
    element.all(by.className("text-input")).clear();
    element(by.css("ion-select[name='role']")).click();
    browser.driver.sleep(1000); // wait for the animation    
    element.all(by.css("div[class='alert-radio-label']")).get(0).click();
    browser.driver.sleep(1000); // wait for the animation
    element(by.css("div[class='alert-button-group'] button:nth-child(2)")).click();
    element(by.css("input[name='fFANumber']")).sendKeys("123456");
    element(by.css("input[name='password']")).sendKeys("test@123");
    element(by.css("input[name='address']")).sendKeys("test User");
    element(by.css("input[name='mobileNumber']")).sendKeys("9876543210");
    element.all(by.css("button[type='submit']")).first().submit();
    browser.driver.sleep(5000); // wait for the animation    
  });

  it('should Create new user', () => {
    let parentNavBar = element(by.css('ion-navbar'));
    parentNavBar.element(by.css("button[menuToggle]")).click();
    browser.driver.sleep(1000); // wait for the animation
    let parent = element(by.css("ion-menu[class='show-menu']"));
    let ionList = parent.element(by.css("ion-list"));
    ionList.all(by.css("button[tappable]")).get(6).click();
    browser.driver.sleep(3000); // wait for the animation           
    expect(browser.getTitle()).toEqual('User Registration');
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(0).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(1).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(2).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(3).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(4).isPresent()).toEqual(true);
    expect(element.all(by.className('blue-label')).get(0).getText()).toEqual('Role');
    expect(element.all(by.className('blue-label')).get(1).getText()).toEqual('FFA Number');
    expect(element.all(by.className('blue-label')).get(2).getText()).toEqual('Password');
    expect(element.all(by.className('blue-label')).get(3).getText()).toEqual('Address');
    expect(element.all(by.className('blue-label')).get(4).getText()).toEqual('Mobile');
    expect(element(by.id('role')).isPresent()).toEqual(true);
    expect(element(by.id('fFANumber')).isPresent()).toEqual(true);
    expect(element(by.id('password')).isPresent()).toEqual(true);
    expect(element(by.id('address')).isPresent()).toEqual(true);
    expect(element(by.id('mobileNumber')).isPresent()).toEqual(true);
    element.all(by.className("text-input")).clear();
    element(by.css("ion-select[name='role']")).click();
    browser.driver.sleep(1000); // wait for the animation    
    element.all(by.css("div[class='alert-radio-label']")).get(0).click();
    browser.driver.sleep(1000); // wait for the animation
    element(by.css("div[class='alert-button-group'] button:nth-child(2)")).click();
    element(by.css("input[name='fFANumber']")).sendKeys("98765432");
    element(by.css("input[name='password']")).sendKeys("test@123");
    element(by.css("input[name='address']")).sendKeys("Create test User");
    element(by.css("input[name='mobileNumber']")).sendKeys("987654");
    element.all(by.css("button[type='submit']")).first().submit();
    browser.driver.sleep(7000); // wait for the animation    
  });

});
