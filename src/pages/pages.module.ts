import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SkillCreatePage } from './skill/skill.create';
import { SkillListPage } from './skill/skill.list';
import { SkillEditPage } from './skill/skill.edit';

@NgModule({
    declarations: [
        SkillEditPage,
        SkillListPage,
        SkillCreatePage
    ],
    imports: [IonicModule],
    exports: [
        SkillEditPage,
        SkillListPage,
        SkillCreatePage
        // Page2,
    ],
    entryComponents: [],
    providers: [],
})

export class PagesModule { }
