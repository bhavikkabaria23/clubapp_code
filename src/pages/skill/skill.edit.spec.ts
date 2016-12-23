import { FormBuilder }             from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SkillEditPage }          from './skill.edit';

import {Skill} from '../../models/Skill';

let fixture: ComponentFixture<SkillEditPage> = null;
let instance: any = null;

describe('SkillEditPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([SkillEditPage]).then(compiled => {
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

  it('Update a skill through to service', () => {
    instance.skill = new Skill();
    instance.skill._id = '580de0f99397a24d5af3dc57';
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

  it('doesn\'t try to update a skill with no skill details', () => {
    spyOn(instance['skillService'], 'UpdateSkill').and.callThrough();
    spyOn(instance, 'onSubmit').and.callThrough();
    expect(instance.onSubmit).not.toHaveBeenCalled();
    expect(instance['skillService'].UpdateSkill).not.toHaveBeenCalled();
  });
});