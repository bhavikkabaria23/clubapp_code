import { FormBuilder }             from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SkillCreatePage }          from './skill.create';

import {Skill} from '../../models/Skill';

let fixture: ComponentFixture<SkillCreatePage> = null;
let instance: any = null;

describe('SkillCreatePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([SkillCreatePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.autoDetectChanges(true);
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(fixture).not.toBeNull();
    expect(instance).not.toBeNull();
  });

  it('passes new skill through to service', () => {
    instance.skill = new Skill();
    instance.skill.name = 'kicking';
    instance.skill.instructions = 'kick da ball';

    instance.skillNewForm = new FormBuilder().group({
      name: [instance.skill.name],
      instructions: [instance.skill.instructions],
    });
    spyOn(instance, 'onSubmit').and.callThrough();
    instance.onSubmit();
    fixture.detectChanges();
    expect(instance.onSubmit).toBeTruthy();
  });

  it('doesn\'t try to add a skill with no skill details', () => {
    spyOn(instance['skillService'], 'NewSkill').and.callThrough();
    spyOn(instance, 'onSubmit').and.callThrough();
    expect(instance.onSubmit).not.toHaveBeenCalled();
    expect(instance['skillService'].NewSkill).not.toHaveBeenCalled();
  });
});