import { data } from './../Datasource';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../SharedComponant/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { campaign } from '../tablelist/interface';
export interface Folder {
  name: string;
  type: string;
  children?: [];
}

// campaign.interface.ts
export interface Campaign {
  type: string;
  id: string;
  name: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isClicked = false;
  addfolder = false;
  openfolder = false;
  hidelist = false;
  constructor(private router: Router, private dialog: MatDialog) {}
  // Folder structure for refernce
  folderStruct = [
    {
      name: 'Christmas',
      type: 'folder',
      children: [
        {
          type: 'campaign',
          id: '001',
          name: 'Christmas Sale 2018',
        },
        {
          name: 'Party',
          type: 'folder',
          location: '/party',
          children: [],
        },
        {
          name: 'Newsletter',
          type: 'folder',
          children: [
            {
              name: 'VIP List',
              type: 'folder',
              children: [],
            },
            {
              name: 'Specials',
              type: 'folder',
              children: [
                {
                  type: 'campaign',
                  id: '009',
                  name: 'Social Updates',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Company's",
      type: 'folder',
      children: [
        {
          name: 'Special Events',
          type: 'folder',
          children: [],
        },
      ],
    },
  ];
  ngOnInit(): void {}
  //Manually handling java script navbar
  showMenu(itemEl: HTMLElement, id: number) {
    this.openfolder = !this.openfolder;
    const box = document.getElementById(id.toString());
    box?.classList.toggle('clickedfolder');
    itemEl.classList.toggle('showMenu');
  }
  locatePage(item: any) {
    console.log(item);
    if (item.location) {
      this.router.navigateByUrl(item.location);
    }
  }
  //Code to add new folder(checks for multiple children)
  addNewFolder() {
    this.addfolder = !this.addfolder;
    const dialogRef = this.dialog.open(DialogBoxComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.addfolder = !this.addfolder;
      console.log(result.data['value'].name);
      if (result.data['value'].children.length > 1) {
        var jsonData: { name: string; type: string; children: any[] } = {
          name: result.data['value'].name,
          type: result.data['value'].type,
          children: [],
        };
        result.data['value'].children.forEach((element: any) => {
          jsonData.children.push({
            type: element.type,
            id: element.id,
            name: element.name,
          });
        });
        this.folderStruct.push(jsonData);
        return;
      } else {
        this.folderStruct.push({
          name: result.data['value'].name,
          type: result.data['value'].type,
          children: [result.data['value'].children[0]],
        });
      }
    });
  }
}
