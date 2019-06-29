import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatExpansionModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatExpansionModule
    ]
})
export class MaterialModule {}