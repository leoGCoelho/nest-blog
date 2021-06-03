import { classToPlain } from 'class-transformer';
import slugify from 'slug';
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, RelationCount } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { UserEntity } from './user.entity';

@Entity('articles')
export class ArticleEntity extends AbstractEntity{
    @Column()
    slug:string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    body:string;

    @ManyToMany(type=>UserEntity, user=>user.favorites, {eager:true})
    favorites:UserEntity[];

    @RelationCount((article:ArticleEntity)=>article.favorites)
    favoritesCount: number;

    @ManyToOne(type=>UserEntity, user=>user.articles, {eager:true})
    author:UserEntity;

    @Column()
    tagList:string[];

    @BeforeInsert()
    generateSlug(){
        this.slug = slugify(this.title, {lower:true}) + '-' + ((Math.random()*500)).toString;
    }

    toJSON(){
        return classToPlain(this);
    }

    makeArticle(user: UserEntity){
        let favorited = null;

        if(user)
            favorited = this.favorites.includes(user);
        const article:any = this.toJSON();
        delete article.favorites;
        return {...article, favorited};
    }
}