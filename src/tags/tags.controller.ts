
import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CoreService } from 'src/core/core.service';

@Controller()
export class TagsController {
  constructor(private tagService: TagsService, private core: CoreService) { }


  @Get('tags/list')
  async getIssues(@Request() req) {
    this.core.authorize(req, 'Acesso Expirado.', 'Realize o login novamente.');
    return this.tagService.getAll(req);
  }

  @Get('tags/teste')
  async teste(@Request() req) {
    // this.core.authorize(req, 'Acesso Expirado.', 'Realize o login novamente.');
    const { payload } = req.query;
    const dataParsed = JSON.parse(payload);
    
    let resultSet = this.tagService.getByGivenIds(dataParsed);
    const selectedTagsArr = (await resultSet).map(data => data.tags);
    const selectedTagsStr = JSON.stringify(selectedTagsArr);
    const selectedTags = selectedTagsStr.substr(1, selectedTagsStr.length - 2);
    console.log('valor: ', selectedTags);
    return;
    
  }


}