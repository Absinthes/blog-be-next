import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { async } from "rxjs";

export const useSwagger = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Blog-Document')
    .setVersion('1.0')
    .addTag('blog')
    .build()
  
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('doc', app, document);
}